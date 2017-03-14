/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Search } from '../models/searches.model';

import { RecentSearchesComponent } from './recent-searches.component';

describe('RecentSearchesComponent', () => {
  let component: RecentSearchesComponent;
  let fixture: ComponentFixture<RecentSearchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentSearchesComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentSearchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('recent searches component should receive input data', async(() => {
    let searches = [new Search('A', new Date("01-31-2017")),
                    new Search('B', new Date("01-31-2017")),
                    new Search('C', new Date("01-31-2017"))];

    component.recentSearches = searches;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.recentSearches)
        .toContain(new Search('A', new Date("01-31-2017")));
    });
  }));
});
