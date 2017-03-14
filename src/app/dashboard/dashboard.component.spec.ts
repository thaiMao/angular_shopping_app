/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../dashboard.service';
import { Observable } from 'rxjs/Observable';

class DashboardServiceStub {
  getRecentSearchesFromStore() {
    return Observable.of(['A', 'B', 'C']);
  };
  getSalesFromStore() {
    return Observable.of([{ date: "01-31-2017", total: 100 },
                          { date: "02-28-2017", total: 200 },
                          { date: "03-31-2017", total: 300 }]);
  };
  getTopGrossingFromStore() {
    return Observable.of([{ group: 'A', total: 100 },
                          { group: 'B', total: 200 },
                          { group: 'C', total: 300 }]);
  };
}

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardService: DashboardService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardComponent ],
      providers: [{ provide: DashboardService, useClass: DashboardServiceStub }],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);

    component = fixture.componentInstance;
    dashboardService = TestBed.get(DashboardService);
    fixture.detectChanges();
  });

  it('dashboard component should get searches', async(() => {
    dashboardService.getRecentSearchesFromStore()
                  .subscribe(searches => {
                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                      expect(searches).toContain('A');
                    })
                  })
  }));

  it('dashboard component should get sales data from store', async(() => {
    dashboardService.getSalesFromStore()
                  .subscribe(searches => {
                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                      expect(searches).toContain({ date: "02-28-2017", total: 200 });
                    })
                  })
  }));

  it('dashboard component should get top selling items from store', async(() => {
    dashboardService.getTopGrossingFromStore()
                    .subscribe(searches => {
                    fixture.detectChanges();
                    fixture.whenStable().then(() => {
                      expect(searches).toContain({ group: 'C', total: 300 });
                    })
                  })
  }));
});
