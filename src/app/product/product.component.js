var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { TrackerService } from '../tracker.service';
import { Item } from '../models/item.model';
export var ProductComponent = (function () {
    function ProductComponent(trackerService) {
        this.trackerService = trackerService;
    }
    ProductComponent.prototype.addToBasket = function () {
        this.trackerService.dispatchProductToCart(this.product);
    };
    __decorate([
        Input('product'), 
        __metadata('design:type', Item)
    ], ProductComponent.prototype, "product", void 0);
    ProductComponent = __decorate([
        Component({
            selector: 'app-product',
            templateUrl: './product.component.html',
            styles: ["\n  .card {\n    margin: 6px;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-start;\n    align-items: center;\n    min-height: 300px;\n    height: 300px;\n  }\n  .description {\n    color: #757575;\n  }\n  .image {\n    height: 90px;\n    width: 90px;\n  }\n  .card:last-child {\n    align-self: flex-end;\n    margin: 4px;\n  }\n  p {\n    text-align: center;\n  }\n\n  md-card-header {\n    margin-bottom: 70px;\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [TrackerService])
    ], ProductComponent);
    return ProductComponent;
}());
//# sourceMappingURL=product.component.js.map