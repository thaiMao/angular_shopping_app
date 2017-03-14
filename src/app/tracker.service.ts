import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as tracker from './actions/tracker';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import gql from 'graphql-tag';
import { Ingredient } from './models/ingredient.model';
import { Item } from './models/item.model';

const Session = gql`
mutation($id: Int, $searchedTerms: [String], $addedToCart: [ProductInput], $date: Date) {
  createSession(id: $id,
                searchedTerms: $searchedTerms,
                addedToCart: $addedToCart,
                date: $date) {
    searchedTerms
    id
    date
    addedToCart {
      name
      price
      image
      description
      quantity
    }
  }
}`;

const updateSession = gql`
mutation($id: Int, $searchedTerms: [String], $addedToCart: [ProductInput], $date: Date) {
  updateSession(id: $id,
                searchedTerms: $searchedTerms,
                addedToCart: $addedToCart,
                date: $date)
}`;

@Injectable()
export class TrackerService {

  cart$: Observable<any>;
  sessionVariables$: Subject<any> = new Subject<any>();
  updateSessionVariables$: Subject<any> = new Subject<any>();
  confirmSave$: Observable<any>;
  confirmUpdate$: Observable<any>;

  constructor(private store: Store<fromRoot.State>,
              private apollo: Apollo) {
    this.cart$ = this.getTrackerAddedToCart();
  }

  emptyCart(): void {
    this.store.dispatch(new tracker.TrackEmptyCart([]));
  }

  emptySearchTerm(): void {
    this.store.dispatch(new tracker.TrackEmptySearchTerms([]));
  }

  dispatchSearchTermEntered(term: any): void {
    this.store.dispatch(new tracker.TrackSearchedTerms(term));
  }

  dispatchProductToCart(product: Item): void {

    var isProductAlreadyCart: boolean = false;

    //If item is already in the cart then increase the quantity by 1.
    this.getTrackerAddedToCart().first()
              .subscribe(cart => {
                cart.forEach((item: any) => {
                  if(item.name === product.name) {
                    this.store.dispatch(new tracker.TrackUpdateCart(Object.assign({}, item, { quantity: item.quantity+1 })));
                    isProductAlreadyCart = true;
                  }
                })
              });

    //If item is not already in the cart then add it to the cart.
    if(!isProductAlreadyCart) {
      this.store.dispatch(new tracker.TrackAddedToCart(Object.assign({}, product, { quantity: 1 })));
    }
  }

  dispatchUpdatedQuantity(update: any): void {
      this.store.dispatch(new tracker.TrackUpdateQuantity(update));
  }

  dispatchRemoveItemFromCart(item: Ingredient): void {
    this.store.dispatch(new tracker.TrackRemoveItemFromCart(item));
  }

  getTrackerSearchedTerms(): Observable<Array<string>> {
    return this.store.select(fromRoot.getTrackerSearchedTerms);
  }

  getTrackerAddedToCart(): Observable<Array<Item>> {
    return this.store.select(fromRoot.getTrackerAddedToCart);
  }

  getTrackerState(): Observable<any> {
    return this.store.select(fromRoot.getTrackerState);
  }

  getTrackerId(): Observable<number> {
    return this.store.select(fromRoot.getTrackerSessionId);
  }

  numberItemsInCart(): Observable<number> {
    return this.getTrackerAddedToCart()
               .skip(1)
               .map((cart: any) => cart.map((item: Item) => item.quantity))
               .switchMap(array =>
                  Observable.from(array)
                            .reduce((acc: number, curr: number) => {
                              return acc + curr }, 0))
               .startWith(0);
  }

  totalValueofCart(): Observable<any> {
    return this.getTrackerAddedToCart()
               .map((item: Item[]) =>
                      item.map((r: Item) => r.price * r.quantity)
                          .reduce((acc:number, curr:number) =>
                              acc += curr, 0));
  }

  saveSession(): void {
    let session: any;
    this.getTrackerState()
        .subscribe(store => {
          session = store;
        });

    this.getTrackerId()
        .first()
        .throttleTime(100)
        .subscribe(id => {
            let _session = Object.assign({}, session, { date: new Date() });

            if(id) {
             this.updateSessionToDb(_session);
            } else {
              this.saveSessionToDb(_session);
            }
        });
  }

  saveSessionToDb(session: any): void {

    this.sessionVariables$.next(session);

    this.confirmSave$ = this.apollo.mutate({
      mutation: Session,
      variables: {
          id: session.id,
          searchedTerms: session.searchedTerms,
          addedToCart: session.addedToCart,
          date: session.date
        }
    });

    this.confirmSave$.subscribe(savedSession => {
      this.dispatchTrackerId(savedSession.data.createSession.id);
    });
  }

  updateSessionToDb(session: any): void {

      this.apollo.mutate({
        mutation: updateSession,
        variables: {
          id: session.id,
          searchedTerms: session.searchedTerms,
          addedToCart: session.addedToCart,
          date: session.date
        }
      });
  }

  dispatchTrackerId(id: number): void {
    this.store.dispatch(new tracker.TrackRegisterId(id));
  }
}
