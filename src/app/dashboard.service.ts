import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { Store } from '@ngrx/store';
import { Search } from './models/searches.model';
import { ItemSales } from './models/item.sales.model';
import { Sales } from './models/sales.model';
import * as fromRoot from './reducers';
import * as dashboard from './actions/dashboard'
import gql from 'graphql-tag';
import * as moment from 'moment';
const d3 = require('d3');
import 'rxjs/add/operator/mergeMap';

const Orders = gql`
query {
  getOrders {
    total
    cart {
      name
      price
      image
      description
      quantity
    }
    sessionId
    date
  }
}`;

const Searches = gql`
query {
  getSessions {
    searchedTerms
    date
  }
}`;

@Injectable()
export class DashboardService {

  salesData: Array<any> = [];
  salesData$: Observable<any>;
  ordersData$: any;
  searches$: any;
  constructor(private http: Http,
              private apollo: Apollo,
              private store: Store<fromRoot.State>) {

    this.ordersData$ = this.apollo.watchQuery({
      query: Orders
    });

    this.searches$ = this.apollo.watchQuery({
      query: Searches
    })
  }

  getRecentSearches() {
    return this.searches$
               .map((obj: any) => obj.data
                              .getSessions
                              .map((session: any) => ({ searchedTerms: session.searchedTerms,
                                                 date: new Date(session.date) }))
                              .filter((session: any) => session.searchedTerms.length > 0))
               .switchMap((sessions: any) => {
                 let searches: Array<any> = [];

                 sessions.forEach((session: any) => {
                   session.searchedTerms.forEach((term: any) => {
                     if(term.length > 0) {
                       searches.push({term: term, date: session.date})
                     }
                   })
                 })
                 return Observable.of(searches);
               })
               .switchMap((searches: any) => {

                 let searchesSortedByDate = searches.sort((a: any,b: any) => {
                   if(a.date < b.date) {
                     return 1;
                   }

                   if(a.date > b.date) {
                     return -1;
                   }
                   return 0;
                 });

                 return Observable.of(searchesSortedByDate.slice(0,5));

               });

  }

  getSalesData() {

    return this.ordersData$
               .map((obj: any) => obj.data.getOrders
               .map((orders: any) => ({ date: orders.date,
                                 total: orders.total })))
               .switchMap((array: any) => {

                 return Observable.from(array)
                                  .groupBy((sale: any) => moment(sale.date).format("YYYY-MM-DD"))
                                  .flatMap(group => {
                                    return group.scan((acc, curr) => {
                                      return curr.total;
                                    }, 0)
                                    .bufferTime(1)
                                    .mergeMap((a: any) => {

                                      var parseTime = d3.timeParse('%Y-%m-%d');

                                      let date = moment(group.key).format("YYYY-MM-DD");
                                      let parsedDate = parseTime(date);

                                      return Observable.of({ date: parsedDate, total: a[0] })
                                    })
                                  })
               })
               .bufferTime(1)
               .filter((array: any) => array.length > 0)
               .switchMap((arrayData: any) => {
                 let sortedByDate = arrayData.sort((a: any, b: any) => {
                   if(a.date < b.date) {
                     return -1;
                   }

                   if(a.date > b.date) {
                     return 1;
                   }

                   return 0;
                 });

                 return Observable.of(sortedByDate);
               })


  }

  getOrdersGQL(): ApolloQueryObservable<any> {
    return this.ordersData$
               .map((obj: any) => obj.data.getOrders);
  }

  calcTopGrossing() {
    return this.ordersData$
               .map((obj: any) => obj.data.getOrders)
    .switchMap((obj: any) => {

      return Observable.of(obj);
    })
        .switchMap((orders: any) => {

          let data: Array<any> = []
          orders.map((order: any) => order.cart)
                .map((carts: any) => carts
                .map((cart: any) =>
                      {
                        let o =  Object.assign({}, { name:  cart.name,
                                   quantity: cart.quantity,
                                   price: cart.price });

                        data.push(o);
                      }))

          return Observable.from(data);
        })
        .groupBy((data: any) => data.name)
        .flatMap((group: any) => {

          return group
          .scan((acc: any, curr: any) => {
            return curr.price*curr.quantity;
          }, 0)
          .bufferTime(1)
          .zip(Observable.of(group.key))
          .filter((array: any) => array.length > 0)
          .map((group: any) => {
            let total: any;
            total = group[0].reduce((acc: any, curr: any) => {
              return acc += curr;
            },0)
            return {total, group: group[1]};
          })
        })
        .bufferTime(1)
        .filter((array: any) => array.length >0)
        .switchMap((array: any) => {

          let sorted: any;
          sorted = array.sort((a: any, b: any) => {
            if(a.total < b.total) {
              return 1;
            }

            if(a.total > b.total) {
              return -1;
            }
            return 0;
          });

          return Observable.of(sorted.slice(0,5));
        })
  }

  dispatchSalesData(): void {
    this.getSalesData().subscribe((sales: any) => {
      let _sales: Array<any> = [];

      sales.forEach((sale: any) => {
        sale.date = new Date(moment(sale.date, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                   .format("MM-DD-YYYY"));

        _sales.push(sale);
      });

      this.store.dispatch(new dashboard.Sales(_sales));
    })
  }

  dispatchTopGrossing(): void {
    this.calcTopGrossing().subscribe((top: any) => {
      this.store.dispatch(new dashboard.TopGrossing(top))
    })
  }

  dispatchRecentSearches(): void {
    this.getRecentSearches().subscribe((searches: any) => {

      let _searches: Array<any> = [];

      searches.forEach((search: any) => {
        searches.date = new Date(moment(search.date, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                   .format("MM-DD-YYYY"));

        _searches.push(search);
      });

      this.store.dispatch(new dashboard.RecentSearches(_searches))
    })
  }

  getSalesFromStore(): Observable<any> {
    return this.store.select(fromRoot.getDashboardSales);
  }

  getRecentSearchesFromStore(): Observable<Array<Search>> {
    return this.store.select(fromRoot.getDashboardRecentSearches);
  }

  getTopGrossingFromStore(): Observable<Array<ItemSales>> {
    return this.store.select(fromRoot.getDashboardTopGrossing);
  }
}
