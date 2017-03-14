import { Injectable, Component, ViewContainerRef } from '@angular/core';
import { MdDialogConfig, MdDialog, MdDialogRef } from '@angular/material';

@Injectable()
export class DialogService {

  constructor(public dialog: MdDialog) { }

  openDialog(message?: string): Promise<boolean> {

    return new Promise<boolean>(resolve => {
      let selectedOption: boolean;
      let dialogRef = this.dialog.open(DialogResult);

      return dialogRef.afterClosed().subscribe(navAway => {

        return resolve(navAway);

      });
    });
  };
}

@Component({
  selector: 'dialog-result-example-dialog',
  template: `
  <h1 md-dialog-title>Alert</h1>
  <md-dialog-content>
  Some item(s) have a quantity of 0. Moving away will remove them from your basket. Are you sure you want to continue?
  </md-dialog-content>

  <div md-dialog-actions>
    <button md-button
    (click)="userResponse(true)">YES</button>
    <button md-button
    (click)="userResponse(false)"
    >NO</button>
  </div>
  `,
})
export class DialogResult {

  constructor(public dialogRef: MdDialogRef<DialogResult>) {}

  userResponse(navigateAway: boolean): void {
    this.dialogRef.close(navigateAway);
  }

}


