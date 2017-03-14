import { Component, OnInit,
         NgZone, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { expiryYearValidator } from '../payment.directive';
import { PaymentService } from '../payment.service';
import { TrackerService } from '../tracker.service';
import { OrderService } from '../order.service';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styles: [`
  .payment-form {
    margin-left: 10%;
    margin-top: 2%;
    width: 80%;
    position: relative;
  }
  small {
    color: red;
  }
  .submit {
    margin-left: 16px;
  }
  .card-icon {
    margin-right: 8px;
  }
  `]
})
export class PaymentComponent implements OnInit {

  form: FormGroup;
  message: string;
  today = moment(new Date()).startOf('month').format("MM-DD-YY");
  invalidDate: boolean = false;

  constructor(private fb: FormBuilder,
              private paymentService: PaymentService,
              private trackerService: TrackerService,
              private orderService: OrderService,
              private _zone: NgZone) { }

  ngOnInit(): void {
    this.formBuild();
  }

  formBuild(): void {

    const cardNoRegex = `^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$`;

    this.form = this.fb.group({
      'cardNumber': ['', Validators.compose([Validators.required,
                Validators.minLength(16),
                Validators.maxLength(16),
                Validators.pattern(cardNoRegex)])
              ],
      'expiration': this.fb.group({
        'expMonth': ['', Validators.compose([Validators.required, Validators.minLength(2),
                                             Validators.maxLength(2),
                                             Validators.pattern(/^(0[1-9]|1[0-2])$/)]
                                           )],
        'expYear': ['', Validators.compose([Validators.required, Validators.minLength(2),
                                            Validators.maxLength(2),
                                            expiryYearValidator])]
      }),
      'cvc': ['', Validators.compose([Validators.required, Validators.minLength(3),
                                      Validators.maxLength(3)])],
      'postalCode': ['', Validators.compose([Validators.required])]
    });

    this.form.valueChanges
        .subscribe(data => {
          this.onValueChanged(data);

        });

    this.onValueChanged();
  };

  onValueChanged(data?: any): void {
    if (!this.form) { return; }
    const form = this.form;

    for(const field in this.formErrors) {
      this.formErrors[field] = '';
      const control = this.form.get(field);

      if(control instanceof FormGroup) {
        for(const subField in this.subFormErrors) {
          this.subFormErrors[subField] = '';
          const subControl = control.get(subField);

          if(subControl && subControl.dirty && !subControl.valid) {
            const subMessages = this.validationMessages[field][subField];
            for(const key in subControl.errors) {
              this.subFormErrors[subField] += subMessages[key] + ' ';
            }
          }
        }
      }

      else if(control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for(const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }

    let expirationStatus = this.form.get('expiration').status;

    if(expirationStatus === 'VALID') {

      let i = this.form.get('expiration') as FormGroup;

      let { expMonth, expYear } = i.controls;

      let expDateEntered = moment(`${expMonth.value}-01-${expYear.value}`, "MM-DD-YY").format("MM-DD-YY");

      if(new Date(expDateEntered) < new Date(this.today)) {
        this.invalidDate = true;
      } else {
        this.invalidDate = false;
      }
    }
  }

  formErrors = {
    cardNumber: '',
    expiration: '',
    cvc: '',
    postalCode: ''
  };

  subFormErrors = {
    expMonth: '',
    expYear: ''
  };

  validationMessages = {
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
  }

  onSubmit(form: any): boolean {
    this.getToken();
    return false;
  }

  getToken(): void {
    (<any>window).Stripe.card.createToken({
      number: this.form.value.cardNumber,
      exp_month: this.form.value.expiration.expMonth,
      exp_year: this.form.value.expiration.expYear,
      cvc: this.form.value.cvc
    }, (status: number, response: any)=> {

      this._zone.run(() => {

        if(status === 200) {
          let amount: number;

          this.trackerService
              .totalValueofCart()
              .subscribe(total => amount = total);

          this.paymentService
              .sendTokenToServer(response, amount)
              .subscribe((payment) => {

                if(payment.status === 'succeeded') {

                  this.form.reset();
                  this.orderService
                      .saveOrderGQL(this.orderService
                      .createOrder());

                } else {
                  console.log('handle payment failure');
                }
              });

        } else {
          this.message = response.error.message;
          console.log('error');
        }
      })
    })
  }

  getNativeElement(element: ElementRef): HTMLElement {
    return element.nativeElement;
  }
}
