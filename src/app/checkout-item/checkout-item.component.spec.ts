/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { CheckoutItemComponent } from './checkout-item.component';
import { TrackerService } from '../tracker.service';
import { Observable } from 'rxjs/Observable';
//import { MaterialModule } from '@angular/material';
//import 'hammerjs';
import { Item } from '../models/item.model'

describe('CheckoutItemComponent', () => {
  let component: CheckoutItemComponent;
  let fixture: ComponentFixture<CheckoutItemComponent>;
  let trackerService;
  let trackerServiceStub;
  let de: DebugElement;
  let el: HTMLElement;
  let i: any;

  beforeEach(() => {
    trackerServiceStub = {
      dispatchUpdatedQuantity () {
        return;
      }
    };
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      //imports: [MaterialModule.forRoot()],
      declarations: [ CheckoutItemComponent ],
      providers: [{ provide: TrackerService, useValue: trackerServiceStub}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutItemComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('md-grid-tile'));
  });

  beforeEach(inject([TrackerService], _ts => {
    trackerService = _ts;
  }))

  it('should render item name', async(() => {

    let ii = new Item('image', //public image: string
                      1, //public price: number
                     'name',  //public name: string
                     ['A'], //public description: Array<string>
                     1); //public quantity: number

    let title = de.nativeElement as HTMLElement;

    component.item = ii;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      //expect(component.item.name).toBe('name');
      expect(title.textContent).toEqual('name');
    })
  }));

});
