import { Directive, OnChanges, Input } from '@angular/core';
import { Validator, AbstractControl,
       NG_VALIDATORS, Validators, ValidatorFn, FormControl } from '@angular/forms';
import * as moment from 'moment';

export function expiryYearValidator(year: FormControl): {[v: string]: boolean} {

  let currentYear: string = moment(new Date()).format('YY');

  if(year.value < currentYear) {

    return {invalidYear: true};
  }
}

@Directive({
  selector: '[appPayment]',
  providers: [{ provide: NG_VALIDATORS,
                useExisting: PaymentDirective,
                multi: true}]
})
export class PaymentDirective implements Validator {

  @Input() cNumber: number;
  private valFn = Validators.nullValidator;

  constructor() { }

  validate(control: AbstractControl): {[key: string]: any} {
    return this.valFn(control);
  }

}
