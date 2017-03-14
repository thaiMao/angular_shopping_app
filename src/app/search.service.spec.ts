/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let service = new SearchService();

  beforeEach(() => { service = new SearchService(); });


  it('searchService Rx subject should update', () => {

    service.getSearchPristine().subscribe(result => {
      expect(result).toBe(true);
    });

  })

  it('ss', () => {
    service.update(false);

    service.getSearchPristine().subscribe(result => {
      expect(result).toBe(false);
    });
  })
});
