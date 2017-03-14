import { Component, OnInit } from '@angular/core';
import { TrackerService } from '../tracker.service';
import { Observable } from 'rxjs/Observable';
import * as tracker from '../actions/tracker';
import { DialogService } from '../dialog.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styles: [`
  .card {
    width: 80%;
    margin-left: 10%;
    margin-top: 2%;
  }
  @media(min-width: 900px) {
    .small-screen {
      display: none;
    }
  }
  @media(max-width: 900px) {
    .large-screen {
      display: none;
    }
  }
  .buttons {
    display: flex;
    flex-direction: row;
    justify content: flex-start;
    align-items: flex-end;
    padding: 2%;
  }
  .button {
    margin: 1%;
  }
  `]
})

export class CheckoutComponent implements OnInit {

  cart$: Observable<Array<Item>>;
  total$: Observable<number>;
  quantity$: Observable<number>;
  cart: Array<Item>;
  deactivate: boolean = true;

  constructor(private trackerService: TrackerService,
              private dialogService: DialogService) { }

  ngOnInit(): void {
    this.cart$ = this.trackerService.getTrackerAddedToCart();
    this.total$ = this.trackerService.totalValueofCart();
    this.quantity$ = this.trackerService.numberItemsInCart();
    this.cart$.subscribe(cart => this.cart = cart);
  }

  onSave(): void {
    this.trackerService.saveSession();
  }

  canDeactivate(): Promise<boolean> | boolean {

    let removeItems: Array<any> = [];

    this.cart.forEach((item: any) => {
      if(item.quantity === 0) {

        if(this.deactivate) {
          this.deactivate = false;
        }

        removeItems.push(item);
      }
    })

    if(this.deactivate === false) {

      return this.dialogService
                 .openDialog()
                 .then((userNavAway) => {

                  if(userNavAway === true) {
                    removeItems.forEach((item) => {
                       this.trackerService.dispatchRemoveItemFromCart(item);
                    });

                    return true;
                  }

                  return false;
      }).then(_deactivate => this.deactivate = _deactivate);
    }

    return this.deactivate;
  }

  trackByFn(index: any, item: Item): string {
    return item.name;
  }
}
