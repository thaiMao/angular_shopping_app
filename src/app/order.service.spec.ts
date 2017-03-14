/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OrderService } from './order.service';
import { TrackerService } from './tracker.service';
import { Apollo } from 'apollo-angular';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from './reducers';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

class RouterStub {
  navigate (url: Array<string>) {
    return url;
  }
};

class TrackerServiceStub {
  getTrackerAddedToCart() {
    return Observable.of([]);
  };
  totalValueofCart() {
    return Observable.of(42);
  };
  getTrackerId() {
    return Observable.of(1);
  };
  emptyCart() {
    return;
  };
  emptySearchTerm(){
    return;
  };
  dispatchTrackerId(){
    return;
  };
};

class ApolloStub {
  mutate () {
    return Observable.of(1);
  }
};

describe('OrderService', () => {
  let apollo;
  let orderService: OrderService;
  let router;
  let trackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ StoreModule.provideStore(fromRoot.reducer)],
      providers: [OrderService,
                  { provide: Apollo, useClass: ApolloStub },
                  { provide: TrackerService, useClass: TrackerServiceStub },
                  { provide: Router, userClass: RouterStub }]
    });
  });

  beforeEach(inject([OrderService, Apollo,
                     TrackerService, Router], (_orderService, _apollo,
                                               _trackerService, _router) => {
    apollo = _apollo;
    orderService = _orderService;
    trackerService = _trackerService;
    router = _router;
  }));

  it('create order should return order created', () => {
    orderService.createOrder().subscribe(result => {
      expect(result.total).toBe(42);
    })
  });

});
