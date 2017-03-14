import { Component, OnInit,
         Input, Output, EventEmitter,
         ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup,
         Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TrackerService } from '../tracker.service';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-checkout-item',
  templateUrl: './checkout-item.component.html',
  styles: [`
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
  `]
})
export class CheckoutItemComponent implements OnInit {

  @Input('item') item: any;
  @Output('updateItem') updateItem = new EventEmitter();
  @ViewChild('add') add: ElementRef;
  @ViewChild('remove') remove: ElementRef;
  quantity: number = 0;
  add$: Observable<number>;
  remove$: Observable<number>;
  quantity$: Observable<number>;
  updatedItem$: Observable<Item>;

  constructor(private trackerService: TrackerService) { }

  ngOnInit(): void {

    this.quantity = this.item.quantity? this.item.quantity : 0;

    this.add$ = Observable.fromEvent(this.getNativeElement(this.add), 'click')
                          .mapTo(1);

    this.remove$ = Observable.fromEvent(this.getNativeElement(this.remove), 'click')
                             .mapTo(-1);

    this.quantity$ = Observable.merge(this.add$, this.remove$)
                               .scan((acc: number, curr: number) => {
                                if(acc+curr >= 0) {
                                  return acc += curr;
                                } else {
                                  return acc; }
                                }, this.quantity)
                               .startWith(this.quantity);


    this.updatedItem$ = this.quantity$.map(updatedQuantity => {

      return Object.assign({}, this.item, { quantity: updatedQuantity });
    });

    this.updatedItem$.subscribe(item => {

      this.trackerService.dispatchUpdatedQuantity(item);
    })
  }

  getNativeElement(element: ElementRef): HTMLElement {
    return element.nativeElement;
  }
}
