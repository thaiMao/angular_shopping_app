var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TrackerService } from './tracker.service';
import { Router } from '@angular/router';
//BASE_URL - To pass swipe token to server
var BASE_URL = 'http://localhost:8080/payment/';
var HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };
export var PaymentService = (function () {
    function PaymentService(http, trackerService, router) {
        this.http = http;
        this.trackerService = trackerService;
        this.router = router;
    }
    PaymentService.prototype.sendTokenToServer = function (token, amount) {
        var total;
        total = Math.round(amount * 100);
        var paymentInfo = Object.assign({}, { stripeToken: token.id,
            total: total });
        return this.http.post(BASE_URL, JSON.stringify(paymentInfo), HEADER)
            .map(function (res) { return res.json(); });
    };
    PaymentService.prototype.canActivate = function () {
        //Payment route access only if cart value > £0.00
        var allow;
        this.trackerService
            .totalValueofCart()
            .subscribe(function (total) {
            if (total > 0) {
                allow = true;
            }
            else {
                allow = false;
            }
        });
        if (!allow) {
            this.router.navigate(['/home']);
        }
        return allow;
    };
    PaymentService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Http, TrackerService, Router])
    ], PaymentService);
    return PaymentService;
}());
//# sourceMappingURL=payment.service.js.map