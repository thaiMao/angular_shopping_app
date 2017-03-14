var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Apollo } from 'apollo-angular';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as dashboard from './actions/dashboard';
import gql from 'graphql-tag';
import * as moment from 'moment';
import 'rxjs/add/operator/mergeMap';
var Orders = (_a = ["\nquery {\n  getOrders {\n    total\n    cart {\n      name\n      price\n      image\n      description\n      quantity\n    }\n    sessionId\n    date\n  }\n}"], _a.raw = ["\nquery {\n  getOrders {\n    total\n    cart {\n      name\n      price\n      image\n      description\n      quantity\n    }\n    sessionId\n    date\n  }\n}"], gql(_a));
var Searches = (_b = ["\nquery {\n  getSessions {\n    searchedTerms\n    date\n  }\n}"], _b.raw = ["\nquery {\n  getSessions {\n    searchedTerms\n    date\n  }\n}"], gql(_b));
export var DashboardService = (function () {
    function DashboardService(http, apollo, store) {
        this.http = http;
        this.apollo = apollo;
        this.store = store;
        this.salesData = [];
        this.ordersData$ = this.apollo.watchQuery({
            query: Orders
        });
        this.searches$ = this.apollo.watchQuery({
            query: Searches
        });
    }
    DashboardService.prototype.getRecentSearches = function () {
        return this.searches$
            .map(function (obj) { return obj.data
            .getSessions
            .map(function (session) { return ({ searchedTerms: session.searchedTerms,
            date: new Date(session.date) }); })
            .filter(function (session) { return session.searchedTerms.length > 0; }); })
            .switchMap(function (sessions) {
            var searches = [];
            sessions.forEach(function (session) {
                session.searchedTerms.forEach(function (term) {
                    if (term.length > 0) {
                        searches.push({ term: term, date: session.date });
                    }
                });
            });
            return Observable.of(searches);
        })
            .switchMap(function (searches) {
            var searchesSortedByDate = searches.sort(function (a, b) {
                if (a.date < b.date) {
                    return 1;
                }
                if (a.date > b.date) {
                    return -1;
                }
                return 0;
            });
            return Observable.of(searchesSortedByDate.slice(0, 5));
        });
    };
    DashboardService.prototype.getSalesData = function () {
        return this.ordersData$
            .map(function (obj) { return obj.data.getOrders
            .map(function (orders) { return ({ date: orders.date,
            total: orders.total }); }); })
            .switchMap(function (array) {
            return Observable.from(array)
                .groupBy(function (sale) { return moment(sale.date).format("YYYY-MM-DD"); })
                .flatMap(function (group) {
                return group.scan(function (acc, curr) {
                    return curr.total;
                }, 0)
                    .bufferTime(1)
                    .mergeMap(function (a) {
                    return Observable.of({ date: new Date(group.key), total: a[0] });
                });
            });
        })
            .bufferTime(1)
            .filter(function (array) { return array.length > 0; })
            .switchMap(function (arrayData) {
            var sortedByDate = arrayData.sort(function (a, b) {
                if (a.date < b.date) {
                    return -1;
                }
                if (a.date > b.date) {
                    return 1;
                }
                return 0;
            });
            return Observable.of(sortedByDate);
        });
    };
    DashboardService.prototype.getOrdersGQL = function () {
        return this.ordersData$
            .map(function (obj) { return obj.data.getOrders; });
    };
    DashboardService.prototype.calcTopGrossing = function () {
        return this.ordersData$
            .map(function (obj) { return obj.data.getOrders; })
            .switchMap(function (obj) {
            return Observable.of(obj);
        })
            .switchMap(function (orders) {
            var data = [];
            orders.map(function (order) { return order.cart; })
                .map(function (carts) { return carts
                .map(function (cart) {
                var o = Object.assign({}, { name: cart.name,
                    quantity: cart.quantity,
                    price: cart.price });
                data.push(o);
            }); });
            return Observable.from(data);
        })
            .groupBy(function (data) { return data.name; })
            .flatMap(function (group) {
            return group
                .scan(function (acc, curr) {
                return curr.price * curr.quantity;
            }, 0)
                .bufferTime(1)
                .zip(Observable.of(group.key))
                .filter(function (array) { return array.length > 0; })
                .map(function (group) {
                var total;
                total = group[0].reduce(function (acc, curr) {
                    return acc += curr;
                }, 0);
                return { total: total, group: group[1] };
            });
        })
            .bufferTime(1)
            .filter(function (array) { return array.length > 0; })
            .switchMap(function (array) {
            var sorted;
            sorted = array.sort(function (a, b) {
                if (a.total < b.total) {
                    return 1;
                }
                if (a.total > b.total) {
                    return -1;
                }
                return 0;
            });
            return Observable.of(sorted.slice(0, 5));
        });
    };
    DashboardService.prototype.dispatchSalesData = function () {
        var _this = this;
        this.getSalesData().subscribe(function (sales) {
            var _sales = [];
            sales.forEach(function (sale) {
                sale.date = new Date(moment(sale.date, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                    .format("MM-DD-YYYY"));
                _sales.push(sale);
            });
            _this.store.dispatch(new dashboard.Sales(_sales));
        });
    };
    DashboardService.prototype.dispatchTopGrossing = function () {
        var _this = this;
        this.calcTopGrossing().subscribe(function (top) {
            _this.store.dispatch(new dashboard.TopGrossing(top));
        });
    };
    DashboardService.prototype.dispatchRecentSearches = function () {
        var _this = this;
        this.getRecentSearches().subscribe(function (searches) {
            var _searches = [];
            searches.forEach(function (search) {
                searches.date = new Date(moment(search.date, "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
                    .format("MM-DD-YYYY"));
                _searches.push(search);
            });
            _this.store.dispatch(new dashboard.RecentSearches(_searches));
        });
    };
    DashboardService.prototype.getSalesFromStore = function () {
        return this.store.select(fromRoot.getDashboardSales);
    };
    DashboardService.prototype.getRecentSearchesFromStore = function () {
        return this.store.select(fromRoot.getDashboardRecentSearches);
    };
    DashboardService.prototype.getTopGrossingFromStore = function () {
        return this.store.select(fromRoot.getDashboardTopGrossing);
    };
    DashboardService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, Apollo, Store])
    ], DashboardService);
    return DashboardService;
}());
var _a, _b;
//# sourceMappingURL=dashboard.service.js.map