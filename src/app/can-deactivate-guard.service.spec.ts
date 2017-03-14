/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';

describe('CanDeactivateGuardService', () => {

  let service: CanDeactivateGuardService;

  beforeEach(() => service = new CanDeactivateGuardService());

  it('service to be initalised', () => {
    let s = new CanDeactivateGuardService();

    expect(s instanceof CanDeactivateGuardService).toEqual(true);
  })

});
