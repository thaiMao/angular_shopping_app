/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CheckoutComponent } from './checkout.component';
import { TrackerService } from '../tracker.service';
import { DialogService } from '../dialog.service';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let trackerService;
  let dialogService;
  let trackerServiceStub;
  let dialogServiceStub;

  beforeEach(() => {
    trackerServiceStub = {
      getTrackerAddedToCart () {
        return Observable.of([]);
      },
      totalValueofCart () {
        return Observable.of(42);
      },
      numberItemsInCart () {
        return Observable.of(42);
      },
      saveSession () {
        return;
      },
      dispatchRemoveItemFromCart () {
        return;
      }
    };
    dialogServiceStub = {
      openDialog () {}
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule.forRoot()],
      declarations: [ CheckoutComponent ],
      providers: [{ provide: TrackerService, useValue: trackerServiceStub },
                  { provide: DialogService, useValue: dialogServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    trackerService = TestBed.get(TrackerService);
    dialogService = TestBed.get(DialogService);
    fixture.detectChanges();
  });

  it('decactivate should be true as the start of app', () => {
    expect(component.deactivate).toBe(true);
  });

  it('component should get cart total', () => {
    component.total$.subscribe(_total => {
      expect(_total).toBe(42);
    })
  })

});
