var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DashboardService } from '../dashboard.service';
export var DashboardComponent = (function () {
    function DashboardComponent(dashboardService) {
        this.dashboardService = dashboardService;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.recentSearches$ = this.dashboardService.getRecentSearchesFromStore();
        this.salesData$ = this.dashboardService.getSalesFromStore();
        this.topGrossing$ = this.dashboardService.getTopGrossingFromStore();
    };
    DashboardComponent = __decorate([
        Component({
            selector: 'app-dashboard',
            template: "\n  <md-card\n  class=\"card\">\n    <md-card-title>Dashboard</md-card-title>\n    <md-card-subtitle>Revenue over time</md-card-subtitle>\n    <md-card-content>\n      <app-chart [data]=\"salesData$ | async\"></app-chart>\n    </md-card-content>\n  </md-card>\n\n  <md-card class=\"card\">\n    <md-card-title>Sales</md-card-title>\n    <md-card-subtitle>Top selling product lines ever</md-card-subtitle>\n    <app-top-grossing [topGrossing]=\"topGrossing$ | async\"></app-top-grossing>\n  </md-card>\n\n  <md-card class=\"card\">\n    <md-card-title>Recent Searches</md-card-title>\n    <app-recent-searches\n    [recentSearches]=\"recentSearches$ | async\"></app-recent-searches>\n  </md-card>\n\n  ",
            styles: ["\n  .card {\n    margin-left: 10%;\n    margin-top: 2%;\n    width: 80%;\n    position: relative;\n  }\n  ul {\n    list-style: none;\n  }"]
        }), 
        __metadata('design:paramtypes', [DashboardService])
    ], DashboardComponent);
    return DashboardComponent;
}());
//# sourceMappingURL=dashboard.component.js.map