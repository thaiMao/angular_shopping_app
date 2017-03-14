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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      { path: 'admin', component: AdminComponent },

    ]),
    MaterialModule.forRoot()
  ],
  declarations: [ AdminComponent, DashboardComponent,
                  ChartComponent, RecentSearchesComponent,
                  TopGrossingComponent ],
  providers: [ DashboardService ]
})
export class AdminModule { }
