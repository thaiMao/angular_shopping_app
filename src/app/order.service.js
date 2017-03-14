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
import { TrackerService } from './tracker.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as order from './actions/order';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
var createOrder = (_a = ["\nmutation($total: Float, $cart: [ProductInput], $sessionId: Int, $date: Date) {\n  createOrder(total: $total, cart: $cart, sessionId: $sessionId, date: $date) {\n    id\n  }\n}"], _a.raw = ["\nmutation($total: Float, $cart: [ProductInput], $sessionId: Int, $date: Date) {\n  createOrder(total: $total, cart: $cart, sessionId: $sessionId, date: $date) {\n    id\n  }\n}"], gql(_a));
export var OrderService = (function () {
    function OrderService(trackerService, router, store, apollo) {
        this.trackerService = trackerService;
        this.router = router;
        this.store = store;
        this.apollo = apollo;
    }
    OrderService.prototype.createOrder = function () {
        return Observable
            .combineLatest(this.trackerService.getTrackerAddedToCart(), this.trackerService.totalValueofCart(), this.trackerService.getTrackerId(), function (cart, total, sessionId) {
            var now = new Date();
            return { cart: cart,
                total: total,
                date: now,
                sessionId: sessionId };
        })
            .first();
    };
    OrderService.prototype.saveOrderGQL = function (_order) {
        var _this = this;
        return _order.subscribe(function (order) {
            var p = Promise.resolve(_this.apollo
                .mutate({ mutation: createOrder,
                variables: {
                    total: order.total,
                    cart: order.cart,
                    sessionId: order.sessionId,
                    date: order.date
                }
            }));
            p.then(function (o) {
                var id;
                o.subscribe(function (r) {
                    id = r.data.createOrder.id;
                    var _o = Object.assign({}, order, { id: id });
                    _this.dispatchOrderToStore(_o);
                });
            })
                .then(function () {
                _this.trackerService.emptyCart();
                _this.trackerService.emptySearchTerm();
                _this.trackerService.dispatchTrackerId(null);
                _this.router.navigate(['/confirmation']);
            });
        });
    };
    OrderService.prototype.dispatchOrderToStore = function (_order) {
        this.store.dispatch(new order.AddOrder(_order));
    };
    OrderService.prototype.getOrderConfirmationDetails = function () {
        return this.store.select(fromRoot.getOrderConfirmed);
    };
    OrderService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [TrackerService, Router, Store, Apollo])
    ], OrderService);
    return OrderService;
}());
var _a;
//# sourceMappingURL=order.service.js.map