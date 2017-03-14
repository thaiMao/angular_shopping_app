import { Component, OnInit,
         Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { TrackerService } from '../tracker.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-search',
  template: `
    <form
    role="search">
      <div class="has">
        <input type="text"
        mdInput
        [formControl] = "term"
        id="search"
        placeholder="Search"
        value =""
        (keyup.enter)="onEnter()">
      </div>
    </form>
  `,
  styles: [`
  #search {
    height: 34px;
    border-radius: 4px;
    border: none;
    color: black;
    font-size: 70%;
    width: 200px;
    padding-left: 8px;
  }

  #search:focus {
    background-color: #EAE6F5;
    color: black;
  }
  `]
})
export class SearchComponent implements OnInit {

  term = new FormControl();
  term$: Observable<string>;

  @Output('termEntered') termEntered = new EventEmitter();
  @Output('termBeingTyped') termBeingTyped = new EventEmitter();

  constructor(private trackerService: TrackerService,
              private searchService: SearchService) { }

  ngOnInit(): void {

    this.term$ = this.term.valueChanges
                          .debounceTime(400)
                          .filter(term => term.length > 1)
                          .distinctUntilChanged()
                          .share();

    this.term$.subscribe(term => {
      this.trackerService.dispatchSearchTermEntered(term);
      this.termBeingTyped.emit(term);

      if(!this.term.pristine) {
        //Communicates to ingredients.component.ts that search box is
        //now dirty using an Rx subject.
        this.searchService.update(this.term.pristine);
      }
    });
  }

  onEnter(): void {
    this.trackerService.dispatchSearchTermEntered(this.term.value);
    this.termEntered.emit(this.term.value);
    this.term.reset('');
  }

}
