import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-payment-confirmation',
  template: `
  <md-card class="card">
    <h3>Thank you for your order!</h3>
    <h4>Your card has been charged £{{order.total | number:'1.2-2' }}</h4>
    <h4>Your order reference is ref: {{ order.id }}</h4>
    <button
    md-raised-button color="primary"
    [routerLink]="['/home']">Home</button>
  </md-card>
  `,
  styles: [`
  .card {
    margin-left: 10%;
    margin-top: 2%;
    width: 80%;
  }
  `]
})
export class PaymentConfirmationComponent implements OnInit {

  orderConfirmation$: Observable<Order>;
  order: Order;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {

    this.orderConfirmation$ = this.orderService.getOrderConfirmationDetails();
    this.orderConfirmation$.subscribe(order => this.order = order);
  }

}
