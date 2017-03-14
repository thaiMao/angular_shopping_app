/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DialogService } from './dialog.service';
import { MdDialog } from '@angular/material';

describe('DialogService', () => {
  let dialogService, dialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogService, MdDialog]
    });
  });

  beforeEach(inject([DialogService, MdDialog], (_dialogService, _mdDialog) => {
    dialogService = _dialogService;
    dialog = _mdDialog;
  }));

});
