var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TrackerService } from '../tracker.service';
import { SearchService } from '../search.service';
export var SearchComponent = (function () {
    function SearchComponent(trackerService, searchService) {
        this.trackerService = trackerService;
        this.searchService = searchService;
        this.term = new FormControl();
        this.termEntered = new EventEmitter();
        this.termBeingTyped = new EventEmitter();
    }
    SearchComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.term$ = this.term.valueChanges
            .debounceTime(400)
            .filter(function (term) { return term.length > 1; })
            .distinctUntilChanged()
            .share();
        this.term$.subscribe(function (term) {
            _this.trackerService.dispatchSearchTermEntered(term);
            _this.termBeingTyped.emit(term);
            if (!_this.term.pristine) {
                //Communicates to ingredients.component.ts that search box is
                //now dirty using an Rx subject.
                _this.searchService.update(_this.term.pristine);
            }
        });
    };
    SearchComponent.prototype.onEnter = function () {
        this.trackerService.dispatchSearchTermEntered(this.term.value);
        this.termEntered.emit(this.term.value);
        this.term.reset('');
    };
    __decorate([
        Output('termEntered'), 
        __metadata('design:type', Object)
    ], SearchComponent.prototype, "termEntered", void 0);
    __decorate([
        Output('termBeingTyped'), 
        __metadata('design:type', Object)
    ], SearchComponent.prototype, "termBeingTyped", void 0);
    SearchComponent = __decorate([
        Component({
            selector: 'app-search',
            template: "\n    <form\n    role=\"search\">\n      <div class=\"has\">\n        <input type=\"text\"\n        mdInput\n        [formControl] = \"term\"\n        id=\"search\"\n        placeholder=\"Search\"\n        value =\"\"\n        (keyup.enter)=\"onEnter()\">\n      </div>\n    </form>\n  ",
            styles: ["\n  #search {\n    height: 0px;\n    border-radius: 4px;\n    box-shadow: none;\n    border: none;\n    padding: 16px;\n    width: 200px;\n    color: black;\n    font-size: 70%;\n    margin-right: 8px;\n    outline: none;\n  }\n\n  #search:focus {\n    background-color: #EAE6F5;\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [TrackerService, SearchService])
    ], SearchComponent);
    return SearchComponent;
}());
//# sourceMappingURL=search.component.js.map