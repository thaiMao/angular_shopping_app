import { Component, OnInit,
         ViewChild, ElementRef } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { TrackerService } from '../tracker.service';
import { Observable } from 'rxjs/Observable';
import { Router, NavigationEnd } from '@angular/router';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styles: [`
  .example-fill-remaining-space {
    flex: 1 1 auto;
  }
  .cart {
    margin-right: 8px;
  }
  `]
})
export class NavBarComponent implements OnInit {

  url: string;
  numberOfItems: Observable<number>;
  @ViewChild('navbar') navbar: ElementRef;
  @ViewChild('homeBtn') homeBtn: ElementRef;
  @ViewChild('homeMenu') homeMenu: ElementRef;
  @ViewChild('dashboardMenu') dashboardMenu: ElementRef;
  onEnterDashboardMenu$: Observable<MouseEvent>;
  onEnterNavbar$: Observable<MouseEvent>;
  nav$: Observable<NavigationEnd>;

  constructor(private ingredientsService: IngredientsService,
              private trackerService: TrackerService,
              private dashboardService: DashboardService,
              private router: Router) { }

  ngOnInit(): void {

    this.onEnterDashboardMenu$ = Observable.fromEvent(this.getNativeElement(this.dashboardMenu),
                                 'mouseenter');

    this.onEnterNavbar$ = Observable.fromEvent(this.getNativeElement(this.navbar),
                         'mouseenter');

    this.nav$ = this.router.events
                    .filter(event => {
                      if(event instanceof NavigationEnd) {
                          return true;
                      }
                    });

    this.getUrl(this.nav$);

    this.numberOfItems = this.trackerService.numberItemsInCart();

    this.saveTrackedUserSession(this.onEnterNavbar$);

    this.prefetchDashboardData(this.onEnterDashboardMenu$);

  }

  enterSearchTerm(term: string): void {
    this.ingredientsService.queryIngredients(term);
  }

  termTyping(term: string): void {
    this.ingredientsService.queryIngredients(term);
  }

  saveDataInStore(): void {
    this.trackerService.saveSession();
  }

  getNativeElement(element: ElementRef): HTMLElement {
    return element.nativeElement;
  }

  prefetchDashboardData(dashboardMenuHover: Observable<MouseEvent>): void {

    dashboardMenuHover
      .filter(() => this.url !== '/admin')
      .throttleTime(1000) //TODO - replace with switchMap with if condition to check if prefetched data already exists in store
      .subscribe(() => {
          this.dashboardService.dispatchSalesData();
          this.dashboardService.dispatchTopGrossing();
          this.dashboardService.dispatchRecentSearches();
      });
  }

  getUrl(routerEvent: Observable<NavigationEnd>): void {
    routerEvent
      .map((end: NavigationEnd) => end.urlAfterRedirects)
      .subscribe(url => this.url = url);
  }

  saveTrackedUserSession(onHoverNavbar: Observable<MouseEvent>): void {
    onHoverNavbar
      .throttleTime(10000)
      .subscribe(() => this.saveDataInStore());
  }
}
