import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Observable } from 'rxjs/Observable';
import { Search } from '../models/searches.model';
import { ItemSales } from '../models/item.sales.model';
import { Sales } from '../models/sales.model';
const d3 = require('d3');
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  template: `
  <!--
  <md-card
  class="card">
    <md-card-title>Dashboard</md-card-title>
    <md-card-subtitle>Revenue over time</md-card-subtitle>
    <md-card-content>
      <app-chart [data]="salesData$ | async"></app-chart>
    </md-card-content>
  </md-card>
  -->

  <md-card class="card">
    <md-card-title>Sales</md-card-title>
    <md-card-subtitle>Top selling product lines ever</md-card-subtitle>
    <app-top-grossing [topGrossing]="topGrossing$ | async"></app-top-grossing>
  </md-card>

  <md-card class="card">
    <md-card-title>Recent Searches</md-card-title>
    <app-recent-searches
    [recentSearches]="recentSearches$ | async"></app-recent-searches>
  </md-card>

  `,
  styles: [`
  .card {
    margin-left: 10%;
    margin-top: 2%;
    width: 80%;
    position: relative;
  }
  ul {
    list-style: none;
  }`]
})

export class DashboardComponent implements OnInit {

  recentSearches$: Observable<Array<Search>>;
  topGrossing$: Observable<Array<ItemSales>>;
  salesData$: Observable<Array<Sales>>;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {

    this.recentSearches$ = this.dashboardService.getRecentSearchesFromStore();
    this.salesData$ = this.dashboardService.getSalesFromStore();
    this.topGrossing$ = this.dashboardService.getTopGrossingFromStore();

  }

}
