import { Injectable } from '@angular/core';
import { TrackerService } from './tracker.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as order from './actions/order';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Order } from './models/order.model';

const createOrder = gql`
mutation($total: Float, $cart: [ProductInput], $sessionId: Int, $date: Date) {
  createOrder(total: $total, cart: $cart, sessionId: $sessionId, date: $date) {
    id
  }
}`;

@Injectable()
export class OrderService {

  constructor(private trackerService: TrackerService,
              private router: Router,
              private store: Store<fromRoot.State>,
              private apollo: Apollo) { }

  createOrder(): Observable<Order> {

    return Observable
            .combineLatest(
              this.trackerService.getTrackerAddedToCart(),
              this.trackerService.totalValueofCart(),
              this.trackerService.getTrackerId(),
              (cart: Array<any>, total: number, sessionId: number) => {

                let now = new Date();
                return { cart,
                         total,
                         date: now,
                         sessionId };
            })
            .first();
  }

  saveOrderGQL(_order: Observable<Order>) {
    return _order.subscribe(order => {

      var p = Promise.resolve(this.apollo
                     .mutate({ mutation: createOrder,
                               variables: {
                                 total: order.total,
                                 cart: order.cart,
                                 sessionId: order.sessionId,
                                 date: order.date
                               }
                             }));

      p.then((o) => {
        var id: number;
        o.subscribe((r: any) => {
          id = r.data.createOrder.id
          let _o = Object.assign({}, order, { id });
          this.dispatchOrderToStore(_o);
        });
      })
      .then(() => {
        this.trackerService.emptyCart();
        this.trackerService.emptySearchTerm();
        this.trackerService.dispatchTrackerId(null);
        this.router.navigate(['/confirmation']);
      })
    })
  }

  dispatchOrderToStore(_order: any): void {
    this.store.dispatch(new order.AddOrder(_order));
  }

  getOrderConfirmationDetails() {
    return this.store.select(fromRoot.getOrderConfirmed);
  }
}
