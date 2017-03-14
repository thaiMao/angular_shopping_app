import { Component, Input } from '@angular/core';
import { ItemSales } from '../models/item.sales.model';

@Component({
  selector: 'app-top-grossing',
  template: `
    <md-grid-list cols="4" rowHeight="60px">
      <md-grid-tile [colspan]=1>
        <md-grid-tile-header>
          Rank
        </md-grid-tile-header>
      </md-grid-tile>
      <md-grid-tile [colspan]=2>
        <md-grid-tile-header>
          Product Description
        </md-grid-tile-header>
      </md-grid-tile>
      <md-grid-tile [colspan]=1>
        <md-grid-tile-header>
          Total
        </md-grid-tile-header>
      </md-grid-tile>
      <div *ngFor="let top of topGrossing; let i = index"
      >
        <md-grid-tile [colspan]=1>

           {{i+1}}

        </md-grid-tile>

        <md-grid-tile [colspan]=2>

           <p class="top-grossing">{{top.group}}</p> {{i}}

        </md-grid-tile>
        <md-grid-tile [colspan]=1>{{top.total | currency:'GBP':true:'1.2-2'}}</md-grid-tile>
      </div>
    </md-grid-list>

    <div class="spinner-container"
    *ngIf="!topGrossing">
        <md-spinner></md-spinner>
    </div>
  `,
  styles: [`
  .total {
    text-align: right;
  }
  p {
    text-align: left;
  }
  .spinner-container {
    min-height: 325px;
    padding-left: 40%;
    padding-top: 10%;
  }
  `]
})
export class TopGrossingComponent {

  @Input() topGrossing: Array<ItemSales>;


}
