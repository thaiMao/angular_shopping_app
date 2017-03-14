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
import { IngredientsService } from '../ingredients.service';
import { SearchService } from '../search.service';
export var IngredientsComponent = (function () {
    function IngredientsComponent(ingredientsService, searchService) {
        this.ingredientsService = ingredientsService;
        this.searchService = searchService;
        this.searchResults = [];
        this.searchPristine = true;
    }
    IngredientsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.ingredientsService.data
            .map(function (results) { return results.data.getTescoItems; })
            .subscribe(function (results) { return _this.searchResults = results; });
        this.ingredientsService.queryIngredients('Chocolate');
        //TODO - Change default search term 'Chocolate' to most recent search term
        this.searchService.getSearchPristine()
            .subscribe(function (pristine) {
            _this.searchPristine = pristine;
        });
    };
    IngredientsComponent = __decorate([
        Component({
            selector: 'app-ingredients',
            template: "\n    <div class=\"title\"\n    *ngIf=\"searchResults.length === 0 && searchPristine === false\">\n      <h3>No results found.</h3>\n    </div>\n\n    <div class=\"title\"\n    *ngIf=\"searchResults.length !== 0\">\n      <h3>Products</h3>\n    </div>\n\n    <div class=\"container\">\n      <div class=\"spinner\"\n      *ngIf=\"searchResults.length === 0 && searchPristine === true\">\n        <md-spinner></md-spinner>\n      </div>\n\n      <app-product class=\"product\"\n      *ngFor=\"let result of searchResults\"\n      [product]=\"result\"></app-product>\n    </div>\n ",
            styles: ["\n  .container {\n    position: absolute;\n    display: flex;\n    flex-direction: row;\n    justify-content: space-evenly;\n    flex-wrap: wrap;\n    align-content: center;\n    z-index: -10;\n    margin: 2%;\n  }\n\n  .title {\n    z-index: -10;\n    margin-left: 7%;\n    margin-top: 1%;\n  }\n\n  .spinner {\n    position: absolute;\n    left: 40%;\n    top: 0;\n  }\n\n  .product {\n    flex: 0 250px;\n  }\n "]
        }), 
        __metadata('design:paramtypes', [IngredientsService, SearchService])
    ], IngredientsComponent);
    return IngredientsComponent;
}());
//# sourceMappingURL=ingredients.component.js.map