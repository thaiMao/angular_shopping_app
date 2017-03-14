var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';
export var DialogService = (function () {
    function DialogService(dialog) {
        this.dialog = dialog;
    }
    DialogService.prototype.openDialog = function (message) {
        var _this = this;
        return new Promise(function (resolve) {
            var selectedOption;
            var dialogRef = _this.dialog.open(DialogResult);
            return dialogRef.afterClosed().subscribe(function (navAway) {
                return resolve(navAway);
            });
        });
    };
    ;
    DialogService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [MdDialog])
    ], DialogService);
    return DialogService;
}());
export var DialogResult = (function () {
    function DialogResult(dialogRef) {
        this.dialogRef = dialogRef;
    }
    DialogResult.prototype.userResponse = function (navigateAway) {
        this.dialogRef.close(navigateAway);
    };
    DialogResult = __decorate([
        Component({
            selector: 'dialog-result-example-dialog',
            template: "\n  <h1 md-dialog-title>Alert</h1>\n  <md-dialog-content>\n  Some item(s) have a quantity of 0. Moving away will remove them from your basket. Are you sure you want to continue?\n  </md-dialog-content>\n\n  <div md-dialog-actions>\n    <button md-button\n    (click)=\"userResponse(true)\">YES</button>\n    <button md-button\n    (click)=\"userResponse(false)\"\n    >NO</button>\n  </div>\n  ",
        }), 
        __metadata('design:paramtypes', [MdDialogRef])
    ], DialogResult);
    return DialogResult;
}());
//# sourceMappingURL=dialog.service.js.map