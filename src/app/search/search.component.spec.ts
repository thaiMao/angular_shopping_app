/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TrackerService } from '../tracker.service';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de: DebugElement;
  let input: DebugElement;
  let trackerServiceStub;
  let trackerService;
  let searchServiceStub;
  let searchService;

  beforeEach(() => {
    searchServiceStub = {
      update (pristine: Observable<boolean>) {
        return Observable.of(false);
      }
    };
    trackerServiceStub = {
      dispatchSearchTermEntered (term: string) {
        return;
      }
    };
  })

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule ],
      declarations: [ SearchComponent ],
      providers: [{ provide: TrackerService, useValue: trackerServiceStub },
                  { provide: SearchService, useValue: searchServiceStub }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    input = de.query(By.css('input'));
    trackerService = TestBed.get(TrackerService);
    searchService = TestBed.get(SearchService);
    fixture.detectChanges();
  });

  it('input box value should bind to "term" property', () => {

    let _inputBox = input.nativeElement as HTMLInputElement;

    // simulate user entering new search term in the input box
    _inputBox.value = 'new search';

    // dispatch a DOM event so that Angular learns of input value change.
    _inputBox.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.term.value).toBe('new search');
  })

  it('input box initial state should be pristine', () => {

    expect(component.term.pristine).toBe(true);
  })

  it('input box pristine state should change to false when user types something in it', () => {
    let _inputBox = input.nativeElement as HTMLInputElement;
     // simulate user entering new search term in the input box
    _inputBox.value = 'user types something';

    // dispatch a DOM event so that Angular learns of input value change.
    _inputBox.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.term.pristine).toBe(false);
  });
});
