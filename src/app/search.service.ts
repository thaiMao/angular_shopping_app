import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SearchService {

  searchPristine: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  update(pristine: boolean): void {

    this.searchPristine.next(pristine);
  }

  getSearchPristine(): Subject<boolean> {

    return this.searchPristine;
  }

}
