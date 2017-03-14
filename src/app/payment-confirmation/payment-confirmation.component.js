var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { OrderService } from '../order.service';
export var PaymentConfirmationComponent = (function () {
    function PaymentConfirmationComponent(orderService) {
        this.orderService = orderService;
    }
    PaymentConfirmationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.orderConfirmation$ = this.orderService.getOrderConfirmationDetails();
        this.orderConfirmation$.subscribe(function (order) { return _this.order = order; });
    };
    PaymentConfirmationComponent = __decorate([
        Component({
            selector: 'app-payment-confirmation',
            template: "\n  <md-card class=\"card\">\n    <h3>Thank you for your order!</h3>\n    <h4>Your card has been charged \u00A3{{order.total | number:'1.2-2' }}</h4>\n    <h4>Your order reference is ref: {{ order.id }}</h4>\n    <button\n    md-raised-button color=\"primary\"\n    [routerLink]=\"['/home']\">Home</button>\n  </md-card>\n  ",
            styles: ["\n  .card {\n    margin-left: 10%;\n    margin-top: 2%;\n    width: 80%;\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [OrderService])
    ], PaymentConfirmationComponent);
    return PaymentConfirmationComponent;
}());
//# sourceMappingURL=payment-confirmation.component.js.map