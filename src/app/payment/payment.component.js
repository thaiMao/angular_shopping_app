var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { expiryYearValidator } from '../payment.directive';
import { PaymentService } from '../payment.service';
import { TrackerService } from '../tracker.service';
import { OrderService } from '../order.service';
import * as moment from 'moment';
export var PaymentComponent = (function () {
    function PaymentComponent(fb, paymentService, trackerService, orderService, _zone) {
        this.fb = fb;
        this.paymentService = paymentService;
        this.trackerService = trackerService;
        this.orderService = orderService;
        this._zone = _zone;
        this.today = moment(new Date()).startOf('month').format("MM-DD-YY");
        this.invalidDate = false;
        this.formErrors = {
            cardNumber: '',
            expiration: '',
            cvc: '',
            postalCode: ''
        };
        this.subFormErrors = {
            expMonth: '',
            expYear: ''
        };
        this.validationMessages = {
            'cardNumber': {
                'required': 'Card number is required',
                'minlength': 'Card number must be at least 16 digits',
                'maxlength': 'Card number cannot be more than 16 digits long',
                'pattern': 'Card number must be valid'
            },
            'expiration': {
                'expMonth': {
                    'required': 'Month is required',
                    'minlength': 'Month must be at least 2 digits',
                    'maxlength': 'Month cannot be more than 2 digits long',
                    'pattern': 'Month must be between 01 and 12'
                },
                'expYear': {
                    'required': 'Year is required',
                    'minlength': 'Year must be at least 2 digits',
                    'maxlength': 'Year cannot be more than 2 digits long',
                    'invalidYear': 'Year must be a future date'
                }
            },
            'cvc': {
                'required': 'CVC is required',
                'minlength': 'CVC must be at least 3 digits',
                'maxlength': 'CVC cannot be more than 3 digits long'
            },
            'postalCode': {
                'required': 'Postal code is required'
            }
        };
    }
    PaymentComponent.prototype.ngOnInit = function () {
        this.formBuild();
    };
    PaymentComponent.prototype.formBuild = function () {
        var _this = this;
        var cardNoRegex = "^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35d{3})d{11})$";
        this.form = this.fb.group({
            'cardNumber': ['', Validators.compose([Validators.required,
                    Validators.minLength(16),
                    Validators.maxLength(16),
                    Validators.pattern(cardNoRegex)])
            ],
            'expiration': this.fb.group({
                'expMonth': ['', Validators.compose([Validators.required, Validators.minLength(2),
                        Validators.maxLength(2),
                        Validators.pattern(/^(0[1-9]|1[0-2])$/)])],
                'expYear': ['', Validators.compose([Validators.required, Validators.minLength(2),
                        Validators.maxLength(2),
                        expiryYearValidator])]
            }),
            'cvc': ['', Validators.compose([Validators.required, Validators.minLength(3),
                    Validators.maxLength(3)])],
            'postalCode': ['', Validators.compose([Validators.required])]
        });
        this.form.valueChanges
            .subscribe(function (data) {
            _this.onValueChanged(data);
        });
        this.onValueChanged();
    };
    ;
    PaymentComponent.prototype.onValueChanged = function (data) {
        if (!this.form) {
            return;
        }
        var form = this.form;
        for (var field in this.formErrors) {
            this.formErrors[field] = '';
            var control = this.form.get(field);
            if (control instanceof FormGroup) {
                for (var subField in this.subFormErrors) {
                    this.subFormErrors[subField] = '';
                    var subControl = control.get(subField);
                    if (subControl && subControl.dirty && !subControl.valid) {
                        var subMessages = this.validationMessages[field][subField];
                        for (var key in subControl.errors) {
                            this.subFormErrors[subField] += subMessages[key] + ' ';
                        }
                    }
                }
            }
            else if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
        var expirationStatus = this.form.get('expiration').status;
        if (expirationStatus === 'VALID') {
            var i = this.form.get('expiration');
            var _a = i.controls, expMonth = _a.expMonth, expYear = _a.expYear;
            var expDateEntered = moment(expMonth.value + "-01-" + expYear.value, "MM-DD-YY").format("MM-DD-YY");
            if (new Date(expDateEntered) < new Date(this.today)) {
                this.invalidDate = true;
            }
            else {
                this.invalidDate = false;
            }
        }
    };
    PaymentComponent.prototype.onSubmit = function (form) {
        this.getToken();
        return false;
    };
    PaymentComponent.prototype.getToken = function () {
        var _this = this;
        window.Stripe.card.createToken({
            number: this.form.value.cardNumber,
            exp_month: this.form.value.expiration.expMonth,
            exp_year: this.form.value.expiration.expYear,
            cvc: this.form.value.cvc
        }, function (status, response) {
            _this._zone.run(function () {
                if (status === 200) {
                    var amount_1;
                    _this.trackerService
                        .totalValueofCart()
                        .subscribe(function (total) { return amount_1 = total; });
                    _this.paymentService
                        .sendTokenToServer(response, amount_1)
                        .subscribe(function (payment) {
                        if (payment.status === 'succeeded') {
                            _this.form.reset();
                            _this.orderService
                                .saveOrderGQL(_this.orderService
                                .createOrder());
                        }
                        else {
                            console.log('handle payment failure');
                        }
                    });
                }
                else {
                    _this.message = response.error.message;
                    console.log('error');
                }
            });
        });
    };
    PaymentComponent.prototype.getNativeElement = function (element) {
        return element.nativeElement;
    };
    PaymentComponent = __decorate([
        Component({
            selector: 'app-payment',
            templateUrl: './payment.component.html',
            styles: ["\n  .payment-form {\n    margin-left: 10%;\n    margin-top: 2%;\n    width: 80%;\n    position: relative;\n  }\n  small {\n    color: red;\n  }\n  .submit {\n    margin-left: 16px;\n  }\n  .card-icon {\n    margin-right: 8px;\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [FormBuilder, PaymentService, TrackerService, OrderService, NgZone])
    ], PaymentComponent);
    return PaymentComponent;
}());
//# sourceMappingURL=payment.component.js.map