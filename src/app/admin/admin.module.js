var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MaterialModule } from '@angular/material';
import { DashboardService } from '../dashboard.service';
import { ChartComponent } from '../chart/chart.component';
import { RecentSearchesComponent } from '../recent-searches/recent-searches.component';
import { TopGrossingComponent } from '../top-grossing/top-grossing.component';
export var AdminModule = (function () {
    function AdminModule() {
    }
    AdminModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                RouterModule.forRoot([
                    { path: 'admin', component: AdminComponent },
                ]),
                MaterialModule.forRoot()
            ],
            declarations: [AdminComponent, DashboardComponent,
                ChartComponent, RecentSearchesComponent,
                TopGrossingComponent],
            providers: [DashboardService]
        }), 
        __metadata('design:paramtypes', [])
    ], AdminModule);
    return AdminModule;
}());
//# sourceMappingURL=admin.module.js.map