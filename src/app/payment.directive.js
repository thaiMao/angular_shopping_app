var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, Validators } from '@angular/forms';
import * as moment from 'moment';
export function expiryYearValidator(year) {
    var currentYear = moment(new Date()).format('YY');
    if (year.value < currentYear) {
        return { invalidYear: true };
    }
}
export var PaymentDirective = (function () {
    function PaymentDirective() {
        this.valFn = Validators.nullValidator;
    }
    PaymentDirective.prototype.validate = function (control) {
        return this.valFn(control);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Number)
    ], PaymentDirective.prototype, "cNumber", void 0);
    PaymentDirective = __decorate([
        Directive({
            selector: '[appPayment]',
            providers: [{ provide: NG_VALIDATORS,
                    useExisting: PaymentDirective,
                    multi: true }]
        }), 
        __metadata('design:paramtypes', [])
    ], PaymentDirective);
    return PaymentDirective;
}());
//# sourceMappingURL=payment.directive.js.map