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
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import * as tracker from './actions/tracker';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
var Session = (_a = ["\nmutation($id: Int, $searchedTerms: [String], $addedToCart: [ProductInput], $date: Date) {\n  createSession(id: $id,\n                searchedTerms: $searchedTerms,\n                addedToCart: $addedToCart,\n                date: $date) {\n    searchedTerms\n    id\n    date\n    addedToCart {\n      name\n      price\n      image\n      description\n      quantity\n    }\n  }\n}"], _a.raw = ["\nmutation($id: Int, $searchedTerms: [String], $addedToCart: [ProductInput], $date: Date) {\n  createSession(id: $id,\n                searchedTerms: $searchedTerms,\n                addedToCart: $addedToCart,\n                date: $date) {\n    searchedTerms\n    id\n    date\n    addedToCart {\n      name\n      price\n      image\n      description\n      quantity\n    }\n  }\n}"], gql(_a));
var updateSession = (_b = ["\nmutation($id: Int, $searchedTerms: [String], $addedToCart: [ProductInput], $date: Date) {\n  updateSession(id: $id,\n                searchedTerms: $searchedTerms,\n                addedToCart: $addedToCart,\n                date: $date)\n}"], _b.raw = ["\nmutation($id: Int, $searchedTerms: [String], $addedToCart: [ProductInput], $date: Date) {\n  updateSession(id: $id,\n                searchedTerms: $searchedTerms,\n                addedToCart: $addedToCart,\n                date: $date)\n}"], gql(_b));
export var TrackerService = (function () {
    function TrackerService(store, apollo) {
        this.store = store;
        this.apollo = apollo;
        this.sessionVariables$ = new Subject();
        this.updateSessionVariables$ = new Subject();
        this.cart$ = this.getTrackerAddedToCart();
    }
    TrackerService.prototype.emptyCart = function () {
        this.store.dispatch(new tracker.TrackEmptyCart([]));
    };
    TrackerService.prototype.emptySearchTerm = function () {
        this.store.dispatch(new tracker.TrackEmptySearchTerms([]));
    };
    TrackerService.prototype.dispatchSearchTermEntered = function (term) {
        this.store.dispatch(new tracker.TrackSearchedTerms(term));
    };
    TrackerService.prototype.dispatchProductToCart = function (product) {
        var _this = this;
        var isProductAlreadyCart = false;
        //If item is already in the cart then increase the quantity by 1.
        this.getTrackerAddedToCart().first()
            .subscribe(function (cart) {
            cart.forEach(function (item) {
                if (item.name === product.name) {
                    _this.store.dispatch(new tracker.TrackUpdateCart(Object.assign({}, item, { quantity: item.quantity + 1 })));
                    isProductAlreadyCart = true;
                }
            });
        });
        //If item is not already in the cart then add it to the cart.
        if (!isProductAlreadyCart) {
            this.store.dispatch(new tracker.TrackAddedToCart(Object.assign({}, product, { quantity: 1 })));
        }
    };
    TrackerService.prototype.dispatchUpdatedQuantity = function (update) {
        this.store.dispatch(new tracker.TrackUpdateQuantity(update));
    };
    TrackerService.prototype.dispatchRemoveItemFromCart = function (item) {
        this.store.dispatch(new tracker.TrackRemoveItemFromCart(item));
    };
    TrackerService.prototype.getTrackerSearchedTerms = function () {
        return this.store.select(fromRoot.getTrackerSearchedTerms);
    };
    TrackerService.prototype.getTrackerAddedToCart = function () {
        return this.store.select(fromRoot.getTrackerAddedToCart);
    };
    TrackerService.prototype.getTrackerState = function () {
        return this.store.select(fromRoot.getTrackerState);
    };
    TrackerService.prototype.getTrackerId = function () {
        return this.store.select(fromRoot.getTrackerSessionId);
    };
    TrackerService.prototype.numberItemsInCart = function () {
        return this.getTrackerAddedToCart()
            .skip(1)
            .map(function (cart) { return cart.map(function (item) { return item.quantity; }); })
            .switchMap(function (array) {
            return Observable.from(array)
                .reduce(function (acc, curr) {
                return acc + curr;
            }, 0);
        })
            .startWith(0);
    };
    TrackerService.prototype.totalValueofCart = function () {
        return this.getTrackerAddedToCart()
            .map(function (item) {
            return item.map(function (r) { return r.price * r.quantity; })
                .reduce(function (acc, curr) {
                return acc += curr;
            }, 0);
        });
    };
    TrackerService.prototype.saveSession = function () {
        var _this = this;
        var session;
        this.getTrackerState()
            .subscribe(function (store) {
            session = store;
        });
        this.getTrackerId()
            .first()
            .throttleTime(100)
            .subscribe(function (id) {
            var _session = Object.assign({}, session, { date: new Date() });
            if (id) {
                _this.updateSessionToDb(_session);
            }
            else {
                _this.saveSessionToDb(_session);
            }
        });
    };
    TrackerService.prototype.saveSessionToDb = function (session) {
        var _this = this;
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
        this.confirmSave$.subscribe(function (savedSession) {
            _this.dispatchTrackerId(savedSession.data.createSession.id);
        });
    };
    TrackerService.prototype.updateSessionToDb = function (session) {
        this.apollo.mutate({
            mutation: updateSession,
            variables: {
                id: session.id,
                searchedTerms: session.searchedTerms,
                addedToCart: session.addedToCart,
                date: session.date
            }
        });
    };
    TrackerService.prototype.dispatchTrackerId = function (id) {
        this.store.dispatch(new tracker.TrackRegisterId(id));
    };
    TrackerService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Store, Apollo])
    ], TrackerService);
    return TrackerService;
}());
var _a, _b;
//# sourceMappingURL=tracker.service.js.map