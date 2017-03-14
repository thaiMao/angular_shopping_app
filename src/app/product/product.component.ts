import { Component, Input } from '@angular/core';
import { TrackerService } from '../tracker.service';
import { Item} from '../models/item.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [`
  .card {
    margin: 6px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    min-height: 300px;
    height: 300px;
    position: relative;
  }
  .description {
    color: #757575;
  }
  .image {
    height: 90px;
    width: 90px;
  }
  .card:last-child {
    align-self: flex-end;
    margin: 4px;
  }
  p {
    text-align: center;
  }

  md-card-header {
    margin-bottom: 70px;
  }

  .buy-btn {
    position: relative;
  }
  `]
})
export class ProductComponent {

  @Input('product') product: Item;

  constructor(private trackerService: TrackerService) { }

  addToBasket(): void {
    this.trackerService.dispatchProductToCart(this.product);
  }
}
