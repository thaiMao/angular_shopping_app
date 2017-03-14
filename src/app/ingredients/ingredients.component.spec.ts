/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { IngredientsComponent } from './ingredients.component';
import { IngredientsService } from '../ingredients.service';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs/Observable';

describe('IngredientsComponent', () => {
  let component: IngredientsComponent;
  let fixture: ComponentFixture<IngredientsComponent>;
  let ingredientsService;
  let ingredientsServiceStub;
  let searchService;
  let searchServiceStub;

  beforeEach(() => {
    ingredientsServiceStub = {
      queryIngredients (query: string) {
        return [];
      },
      data: Observable.of({ data: {
        getTescoItems: []
      }})
    };

    searchServiceStub = {
      getSearchPristine () {
        return Observable.of(true);
      }
    };
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngredientsComponent ],
      providers: [{provide: IngredientsService, useValue: ingredientsServiceStub },
                  {provide: SearchService, useValue: searchServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientsComponent);
    component = fixture.componentInstance;

    ingredientsService = TestBed.get(IngredientsService);
    searchService = TestBed.get(SearchService);

    fixture.detectChanges();
  });

  it('initial search input state should be "pristine"', () => {
    expect(component.searchPristine).toBe(true);
  });

});
