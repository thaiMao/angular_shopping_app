var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { TrackerService } from '../tracker.service';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';
import { DashboardService } from '../dashboard.service';
export var NavBarComponent = (function () {
    function NavBarComponent(ingredientsService, trackerService, dashboardService, router) {
        this.ingredientsService = ingredientsService;
        this.trackerService = trackerService;
        this.dashboardService = dashboardService;
        this.router = router;
    }
    NavBarComponent.prototype.ngOnInit = function () {
        this.onEnterDashboardMenu$ = Observable.fromEvent(this.getNativeElement(this.dashboardMenu), 'mouseenter');
        this.onEnterNavbar$ = Observable.fromEvent(this.getNativeElement(this.navbar), 'mouseenter');
        this.nav$ = this.router.events
            .filter(function (event) {
            if (event instanceof NavigationEnd) {
                return true;
            }
        });
        this.getUrl(this.nav$);
        this.numberOfItems = this.trackerService.numberItemsInCart();
        this.saveTrackedUserSession(this.onEnterNavbar$);
        this.prefetchDashboardData(this.onEnterDashboardMenu$);
    };
    NavBarComponent.prototype.enterSearchTerm = function (term) {
        this.ingredientsService.queryIngredients(term);
    };
    NavBarComponent.prototype.termTyping = function (term) {
        this.ingredientsService.queryIngredients(term);
    };
    NavBarComponent.prototype.saveDataInStore = function () {
        this.trackerService.saveSession();
    };
    NavBarComponent.prototype.getNativeElement = function (element) {
        return element.nativeElement;
    };
    NavBarComponent.prototype.prefetchDashboardData = function (dashboardMenuHover) {
        var _this = this;
        dashboardMenuHover
            .filter(function () { return _this.url !== '/admin'; })
            .throttleTime(1000) //TODO - replace with switchMap with if condition to check if prefetched data already exists in store
            .subscribe(function () {
            _this.dashboardService.dispatchSalesData();
            _this.dashboardService.dispatchTopGrossing();
            _this.dashboardService.dispatchRecentSearches();
        });
    };
    NavBarComponent.prototype.getUrl = function (routerEvent) {
        var _this = this;
        routerEvent
            .map(function (end) { return end.urlAfterRedirects; })
            .subscribe(function (url) { return _this.url = url; });
    };
    NavBarComponent.prototype.saveTrackedUserSession = function (onHoverNavbar) {
        var _this = this;
        onHoverNavbar
            .throttleTime(10000)
            .subscribe(function () { return _this.saveDataInStore(); });
    };
    __decorate([
        ViewChild('navbar'), 
        __metadata('design:type', ElementRef)
    ], NavBarComponent.prototype, "navbar", void 0);
    __decorate([
        ViewChild('homeBtn'), 
        __metadata('design:type', ElementRef)
    ], NavBarComponent.prototype, "homeBtn", void 0);
    __decorate([
        ViewChild('homeMenu'), 
        __metadata('design:type', ElementRef)
    ], NavBarComponent.prototype, "homeMenu", void 0);
    __decorate([
        ViewChild('dashboardMenu'), 
        __metadata('design:type', ElementRef)
    ], NavBarComponent.prototype, "dashboardMenu", void 0);
    NavBarComponent = __decorate([
        Component({
            selector: 'app-nav-bar',
            templateUrl: './nav-bar.component.html',
            styles: ["\n  .example-fill-remaining-space {\n    flex: 1 1 auto;\n  }\n  .cart {\n    margin-right: 8px;\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [IngredientsService, TrackerService, DashboardService, Router])
    ], NavBarComponent);
    return NavBarComponent;
}());
//# sourceMappingURL=nav-bar.component.js.map