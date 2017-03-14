/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IngredientsService } from './ingredients.service';
import { Apollo, ApolloQueryObservable } from 'apollo-angular';
import { ApolloClient, createNetworkInterface } from 'apollo-client';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

describe('IngredientsService', () => {

  let ingredientsService: IngredientsService;
  let apollo;
  let apolloStub;

  beforeEach(() => {
    apolloStub = {
      watchQuery () {
        return Observable.of(["A", "B"]);
      }
    };
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [IngredientsService,
                  { provide: Apollo, useValue: apolloStub }]
    });
  }));

  beforeEach(() => {
    apollo = TestBed.get(Apollo);
  })

  beforeEach(inject([IngredientsService], _service => {
    ingredientsService = _service;
  }));

  //specs
  it('get search results should return a response', () => {

    ingredientsService.getSearchResults().subscribe(data => {

      expect(data).toContain("A");
    })
  })

  it('call next on Rx Subject should store new search term', () => {

    ingredientsService.term$.next('test');
    ingredientsService.term$.subscribe(result => {
      expect(result).toBe('test');
    })
  })
});
