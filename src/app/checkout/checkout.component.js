var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { TrackerService } from '../tracker.service';
import { DialogService } from '../dialog.service';
export var CheckoutComponent = (function () {
    function CheckoutComponent(trackerService, dialogService) {
        this.trackerService = trackerService;
        this.dialogService = dialogService;
        this.deactivate = true;
    }
    CheckoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.cart$ = this.trackerService.getTrackerAddedToCart();
        this.total$ = this.trackerService.totalValueofCart();
        this.quantity$ = this.trackerService.numberItemsInCart();
        this.cart$.subscribe(function (cart) { return _this.cart = cart; });
    };
    CheckoutComponent.prototype.onSave = function () {
        this.trackerService.saveSession();
    };
    CheckoutComponent.prototype.canDeactivate = function () {
        var _this = this;
        var removeItems = [];
        this.cart.forEach(function (item) {
            if (item.quantity === 0) {
                if (_this.deactivate) {
                    _this.deactivate = false;
                }
                removeItems.push(item);
            }
        });
        if (this.deactivate === false) {
            return this.dialogService
                .openDialog()
                .then(function (userNavAway) {
                if (userNavAway === true) {
                    removeItems.forEach(function (item) {
                        _this.trackerService.dispatchRemoveItemFromCart(item);
                    });
                    return true;
                }
                return false;
            }).then(function (_deactivate) { return _this.deactivate = _deactivate; });
        }
        return this.deactivate;
    };
    CheckoutComponent.prototype.trackByFn = function (index, item) {
        return item.name;
    };
    CheckoutComponent = __decorate([
        Component({
            selector: 'app-checkout',
            templateUrl: './checkout.component.html',
            styles: ["\n  .card {\n    width: 80%;\n    margin-left: 10%;\n    margin-top: 2%;\n  }\n  @media(min-width: 900px) {\n    .small-screen {\n      display: none;\n    }\n  }\n  @media(max-width: 900px) {\n    .large-screen {\n      display: none;\n    }\n  }\n  .buttons {\n    display: flex;\n    flex-direction: row;\n    justify content: flex-start;\n    align-items: flex-end;\n    padding: 2%;\n  }\n  .button {\n    margin: 1%;\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [TrackerService, DialogService])
    ], CheckoutComponent);
    return CheckoutComponent;
}());
//# sourceMappingURL=checkout.component.js.map