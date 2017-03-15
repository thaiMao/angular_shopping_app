import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { TrackerService } from './tracker.service';
import { Observable } from 'rxjs/Observable';
import { CanActivate, Router } from '@angular/router';

//BASE_URL - To pass swipe token to server
//const BASE_URL = 'http://localhost:8080/payment/';
const BASE_URL = 'https://cryptic-ravine-38483.herokuapp.com/payment/'
const HEADER = { headers: new Headers({ 'Content-Type': 'application/json' }) };

@Injectable()
export class PaymentService implements CanActivate {

  constructor(private http: Http,
              private trackerService: TrackerService,
              private router: Router) { }

  sendTokenToServer(token: any, amount: any) {

    let total: number;

    total = Math.round(amount*100);

    let paymentInfo = Object.assign({}, { stripeToken: token.id,
                                          total });

    return this.http.post(BASE_URL, JSON.stringify(paymentInfo), HEADER)
             .map(res => res.json());

  }

  canActivate(): boolean {

    //Payment route access only if cart value > £0.00
    let allow: boolean;

    this.trackerService
        .totalValueofCart()
        .subscribe(total => {
          if(total > 0) {
            allow = true;
          } else {
            allow = false;
          }
        })

    if(!allow) { //Redirect to '/home' if cart value is £0
      this.router.navigate(['/home']);
    }

    return allow;
  }
}
