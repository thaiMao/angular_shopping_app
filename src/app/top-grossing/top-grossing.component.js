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
export var TopGrossingComponent = (function () {
    function TopGrossingComponent() {
    }
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], TopGrossingComponent.prototype, "topGrossing", void 0);
    TopGrossingComponent = __decorate([
        Component({
            selector: 'app-top-grossing',
            template: "\n    <md-grid-list cols=\"4\" rowHeight=\"60px\">\n      <md-grid-tile [colspan]=1>\n        <md-grid-tile-header>\n          Rank\n        </md-grid-tile-header>\n      </md-grid-tile>\n      <md-grid-tile [colspan]=2>\n        <md-grid-tile-header>\n          Product Description\n        </md-grid-tile-header>\n      </md-grid-tile>\n      <md-grid-tile [colspan]=1>\n        <md-grid-tile-header>\n          Total\n        </md-grid-tile-header>\n      </md-grid-tile>\n      <div *ngFor=\"let top of topGrossing; let i = index\"\n      >\n        <md-grid-tile [colspan]=1>\n\n           {{i+1}}\n\n        </md-grid-tile>\n\n        <md-grid-tile [colspan]=2>\n\n           <p class=\"top-grossing\">{{top.group}}</p> {{i}}\n\n        </md-grid-tile>\n        <md-grid-tile [colspan]=1>{{top.total | currency:'GBP':true:'1.2-2'}}</md-grid-tile>\n      </div>\n    </md-grid-list>\n\n    <div class=\"spinner-container\"\n    *ngIf=\"!topGrossing\">\n        <md-spinner></md-spinner>\n    </div>\n  ",
            styles: ["\n  .total {\n    text-align: right;\n  }\n  p {\n    text-align: left;\n  }\n  .spinner-container {\n    min-height: 325px;\n    padding-left: 40%;\n    padding-top: 10%;\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], TopGrossingComponent);
    return TopGrossingComponent;
}());
//# sourceMappingURL=top-grossing.component.js.map