/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { PaymentConfirmationComponent } from './payment-confirmation.component';
import { OrderService } from '../order.service';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { Observable } from 'rxjs/Observable';

describe('PaymentConfirmationComponent', () => {
  let component: PaymentConfirmationComponent;
  let fixture: ComponentFixture<PaymentConfirmationComponent>;
  let orderService;
  let orderServiceStub;
  let de: DebugElement;
  let title: HTMLElement;

  beforeEach(() => {
    orderServiceStub = {
      getOrderConfirmationDetails () {
        return Observable.of({ life: 42 });
      }
    };
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule.forRoot()],
      declarations: [ PaymentConfirmationComponent ],
      providers: [{ provide: OrderService, useValue: orderServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentConfirmationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h3'));
    title = de.nativeElement;
    orderService = TestBed.get(OrderService);
    fixture.detectChanges();
  });

  it('should successfully render template', async(() => {
    expect(title.innerText).toBe('Thank you for your order!');
  }));

  it('should retrieve order', () => {
    component.orderConfirmation$.subscribe(_order => {
      expect(_order).toEqual({ life: 42 });
    })
  })
});
