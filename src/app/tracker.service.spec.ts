/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrackerService } from './tracker.service';
import { Store, StoreModule, provideStore } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from './reducers';

describe('TrackerService', () => {

  let trackerService: TrackerService;
  let store: Store<fromRoot.State>;
  let apolloStub;

  beforeEach(() => {
    apolloStub = {
      mutate (session) {
        return Observable.of(42);
      }
    };
  })

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ StoreModule.provideStore(fromRoot.reducer) ],
    providers: [ TrackerService, { provide: Apollo, useValue: apolloStub } ]
  }));

  beforeEach(() => {
   trackerService = TestBed.get(TrackerService);
  })

  it('number of cart items should be zero', () => {

    trackerService.numberItemsInCart().subscribe(noItems => {
      expect(noItems).toBe(0);
    })
  });
});
