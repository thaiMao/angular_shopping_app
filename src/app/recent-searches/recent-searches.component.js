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
export var RecentSearchesComponent = (function () {
    function RecentSearchesComponent() {
    }
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], RecentSearchesComponent.prototype, "recentSearches", void 0);
    RecentSearchesComponent = __decorate([
        Component({
            selector: 'app-recent-searches',
            templateUrl: './recent-searches.component.html',
            styles: ["\n  td {\n    min-width: 200px;\n  }\n  .spinner-container {\n    min-height: 325px;\n    padding-left: 40%;\n    padding-top: 10%;\n  }\n  @media(max-width: 600px) {\n    .date {\n      display: none;\n    }\n  }"]
        }), 
        __metadata('design:paramtypes', [])
    ], RecentSearchesComponent);
    return RecentSearchesComponent;
}());
//# sourceMappingURL=recent-searches.component.js.map