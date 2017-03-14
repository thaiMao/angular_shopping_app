/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { TrackerService } from '../tracker.service';
import { ProductComponent } from './product.component';
import { Ingredient } from '../models/ingredient.model';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../reducers';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;
  let trackerService: TrackerService;
  let trackerServiceStub;
  let de: DebugElement;
  let el;
  let p;
  let button;


  class TrackerServiceStub {
    dispatchProductToCart (product) {
      this.count += 1;
      return 0;
    }
    count = 0;
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MaterialModule.forRoot(),
                 StoreModule.provideStore(fromRoot.reducer)],
      declarations: [ ProductComponent ],
      providers: [{ provide: TrackerService, useClass: TrackerServiceStub }],
      //schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('b'));
  })

  beforeEach(inject([TrackerService], _ts => {
    trackerService = _ts;
  }));


  it('input name should render to template', async(() => {

    let title = de.nativeElement as HTMLElement;

    p = new Ingredient('http://img.tesco.com/Groceries/pi/283/5054775750283/IDShot_90x90.jpg', //image
                           1, //tpnb
                           1, //price
                           '', //PromotionDescription
                           '', //ContentsMeasureType
                           'name', //name
                           1, //UnitOfSale
                           1, //AverageSellingUnitWeight
                           ['A'], //description
                           '', //UnitQuantity
                           1, //ContentsQuantity
                           1); //unitprice: number

    component.product = p;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      expect(title.textContent).toEqual(component.product.name);


    })


  }))

});
