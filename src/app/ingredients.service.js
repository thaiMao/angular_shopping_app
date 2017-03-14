var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
var Query = (_a = ["\nquery($term: String) {\n  getTescoItems(term: $term) {\n    name\n    price\n    image\n    description\n  }\n}"], _a.raw = ["\nquery($term: String) {\n  getTescoItems(term: $term) {\n    name\n    price\n    image\n    description\n  }\n}"], gql(_a));
export var IngredientsService = (function () {
    function IngredientsService(apollo) {
        this.apollo = apollo;
        this.term$ = new Subject();
        this.data = apollo.watchQuery({
            query: Query,
            variables: {
                term: this.term$
            }
        });
    }
    IngredientsService.prototype.queryIngredients = function (term) {
        this.term$.next(term);
        return this.getSearchResults();
    };
    IngredientsService.prototype.getSearchResults = function () {
        return this.data;
    };
    IngredientsService = __decorate([
        Injectable(), 
        __metadata('design:paramtypes', [Apollo])
    ], IngredientsService);
    return IngredientsService;
}());
var _a;
//# sourceMappingURL=ingredients.service.js.map