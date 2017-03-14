/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { TopGrossingComponent } from './top-grossing.component';

describe('TopGrossingComponent', () => {
  let component: TopGrossingComponent;
  let fixture: ComponentFixture<TopGrossingComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopGrossingComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopGrossingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should retrieve input data', async(() => {

    component.topGrossing = [{ group: 'A', total: 100 },
                             { group: 'B', total: 200 },
                             { group: 'C', total: 300 }];

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(component.topGrossing).toContain({ group: 'A', total: 100 });
    });
  }))



});
