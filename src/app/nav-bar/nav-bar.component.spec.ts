/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { IngredientsService } from '../ingredients.service';
import { TrackerService } from '../tracker.service';
import { DashboardService } from '../dashboard.service';
import { NavBarComponent } from './nav-bar.component';
import { MaterialModule } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'hammerjs';

const ButtonClickEvents = {
   left:  { button: 0 },
   right: { button: 2 }
};

function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
  if (el instanceof HTMLElement) {
    el.click();
  } else {
    el.triggerEventHandler('click', eventObj);
  }
}

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let element;
  let de;
  let buttons: DebugElement;
  let ingredientsService;
  let trackerService;
  let dashboardService;
  let apolloService;
  let ingredientsServiceStub;
  let trackerServiceStub;
  let dashboardServiceStub;
  let router;
  let routerStub;

  beforeEach(() => {
    ingredientsServiceStub = {
      queryIngredients () { return 'Hello'; }
    };

    trackerServiceStub = {
      numberItemsInCart () {
        return Observable.of(42);
      },
      saveSession () {
        return;
      }
    };

    dashboardServiceStub = {
      dispatchSalesData () {},
      dispatchTopGrossing () {},
      dispatchRecentSearches () {}
    };

    routerStub = {
      events: Observable.of(1)
    };
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule.forRoot()],
      declarations: [ NavBarComponent ],
      providers: [ { provide: IngredientsService,
                     useValue: ingredientsServiceStub },
                   { provide: TrackerService,
                     useValue: trackerServiceStub },
                   { provide: DashboardService,
                     useValue: dashboardServiceStub },
                   { provide: Router,
                     useValue: routerStub }
                 ],
      schemas: [NO_ERRORS_SCHEMA]
    })

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    ingredientsService = TestBed.get(IngredientsService);
    trackerService = TestBed.get(TrackerService);
    dashboardService = TestBed.get(DashboardService);
    router = TestBed.get(Router);
    de = fixture.debugElement;
    buttons = de.queryAll(By.css('button'))
    fixture.detectChanges();
  });

  it('url should change', () => {

    component.url = '/home';
    //let homeButton = buttons[0].nativeElement as HTMLElement;
    //component.url = '/home';
    //click(homeButton);

    fixture.detectChanges();

    expect(component.url).toBe('/home');
  })







});
