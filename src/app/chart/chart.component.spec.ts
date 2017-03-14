/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { ChartComponent } from './chart.component';
import { Sales } from '../models/sales.model';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('chart component should receive input data', async(() => {
    let i = [new Sales(new Date("01-31-17"), 100),
             new Sales(new Date("02-28-17"), 200)];

    component.data = i;

    fixture.detectChanges();

    expect(component.data).toContain(new Sales(new Date("01-31-17"), 100));
  }))

});
