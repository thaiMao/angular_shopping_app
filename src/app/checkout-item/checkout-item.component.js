var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TrackerService } from '../tracker.service';
export var CheckoutItemComponent = (function () {
    function CheckoutItemComponent(trackerService) {
        this.trackerService = trackerService;
        this.updateItem = new EventEmitter();
        this.quantity = 0;
    }
    CheckoutItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.quantity = this.item.quantity ? this.item.quantity : 0;
        this.add$ = Observable.fromEvent(this.getNativeElement(this.add), 'click')
            .mapTo(1);
        this.remove$ = Observable.fromEvent(this.getNativeElement(this.remove), 'click')
            .mapTo(-1);
        this.quantity$ = Observable.merge(this.add$, this.remove$)
            .scan(function (acc, curr) {
            if (acc + curr >= 0) {
                return acc += curr;
            }
            else {
                return acc;
            }
        }, this.quantity)
            .startWith(this.quantity);
        this.updatedItem$ = this.quantity$.map(function (updatedQuantity) {
            return Object.assign({}, _this.item, { quantity: updatedQuantity });
        });
        this.updatedItem$.subscribe(function (item) {
            _this.trackerService.dispatchUpdatedQuantity(item);
        });
    };
    CheckoutItemComponent.prototype.getNativeElement = function (element) {
        return element.nativeElement;
    };
    __decorate([
        Input('item'), 
        __metadata('design:type', Object)
    ], CheckoutItemComponent.prototype, "item", void 0);
    __decorate([
        Output('updateItem'), 
        __metadata('design:type', Object)
    ], CheckoutItemComponent.prototype, "updateItem", void 0);
    __decorate([
        ViewChild('add'), 
        __metadata('design:type', ElementRef)
    ], CheckoutItemComponent.prototype, "add", void 0);
    __decorate([
        ViewChild('remove'), 
        __metadata('design:type', ElementRef)
    ], CheckoutItemComponent.prototype, "remove", void 0);
    CheckoutItemComponent = __decorate([
        Component({
            selector: 'app-checkout-item',
            templateUrl: './checkout-item.component.html',
            styles: ["\n    @media(min-width: 900px) {\n    .small-screen {\n      display: none;\n    }\n  }\n  @media(max-width: 900px) {\n    .large-screen {\n      display: none;\n    }\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [TrackerService])
    ], CheckoutItemComponent);
    return CheckoutItemComponent;
}());
//# sourceMappingURL=checkout-item.component.js.map