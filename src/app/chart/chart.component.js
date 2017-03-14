var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ElementRef, ViewChild } from '@angular/core';
var d3 = require('d3');
export var ChartComponent = (function () {
    function ChartComponent() {
        this.data = [];
        this.width = 0;
    }
    ChartComponent.prototype.ngAfterViewInit = function () {
        this.htmlElement = this.element.nativeElement;
        this.host = d3.select(this.htmlElement);
        if (!this.data || this.data.length === 0 || !this.host || this.data === null)
            return;
        this.setup();
        this.buildSVG();
        this.drawXAxis();
        this.drawYAxis();
        this.populate();
    };
    /*
    ngOnChanges(): void {
      this.htmlElement = this.element.nativeElement;
      this.host = d3.select(this.htmlElement);
  
      if(!this.data || this.data.length === 0 || !this.host || this.data === null) return;
  
  
  
  
      this.setup();
      this.buildSVG();
      this.drawXAxis();
      this.drawYAxis();
      this.populate();
    }
    */
    ChartComponent.prototype.setup = function () {
        this.margin = { top: 20, right: 20, left: 40, bottom: 40 };
        this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
        this.height = (this.width * 0.5) - this.margin.top - this.margin.bottom;
        this.xScale = d3.scaleTime()
            .domain([d3.min(this.data, function (d) { return d.date; }),
            d3.max(this.data, function (d) { return d.date; })])
            .range([0, this.width]);
        this.yScale = d3.scaleLinear()
            .domain([d3.min(this.data, function (d) { return d.total; }),
            d3.max(this.data, function (d) { return d.total; })])
            .range([this.height, 0]);
    };
    ChartComponent.prototype.buildSVG = function () {
        this.host.html('');
        this.svg = this.host
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .call(responsivefy)
            .append('g')
            .attr('transform', "translate(" + this.margin.left + ",\n                                                   " + this.margin.top + ")");
        function responsivefy(svg) {
            var margin = { top: 20, right: 20, left: 40, bottom: 40 };
            var container = d3.select(svg.node().parentNode);
            var width = parseInt(svg.style('width'));
            var height = parseInt(svg.style('height'));
            var aspect = width / height;
            svg.attr('viewBox', "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom))
                .attr('preserveAspectRatio', 'xMinYMid')
                .call(resize);
            d3.select(window).on('resize.' + container.attr('id'), resize);
            function resize() {
                var targetWidth = parseInt(container.style('width'));
                svg.attr('width', targetWidth);
                svg.attr('height', Math.round(targetWidth / aspect));
            }
        }
    };
    ChartComponent.prototype.drawXAxis = function () {
        this.svg.append('g')
            .attr('transform', "translate(0, " + this.height + ")")
            .call(d3.axisBottom(this.xScale).ticks(6));
    };
    ChartComponent.prototype.drawYAxis = function () {
        this.svg.append('g')
            .call(d3.axisLeft(this.yScale));
    };
    ChartComponent.prototype.populate = function () {
        var _this = this;
        var line = d3.line()
            .x(function (d) { return _this.xScale(d.date); })
            .y(function (d) { return _this.yScale(d.total); })
            .curve(d3.curveCatmullRom.alpha(0.9));
        this.svg.selectAll('.line')
            .data(this.data)
            .enter()
            .append('path')
            .attr('class', 'line')
            .attr('d', function (d) { return line(_this.data); })
            .style('stroke', 'red')
            .style('stroke-width', 2)
            .style('fill', 'none');
    };
    __decorate([
        Input(), 
        __metadata('design:type', Array)
    ], ChartComponent.prototype, "data", void 0);
    __decorate([
        ViewChild('container'), 
        __metadata('design:type', ElementRef)
    ], ChartComponent.prototype, "element", void 0);
    ChartComponent = __decorate([
        Component({
            selector: 'app-chart',
            template: "\n  <div #container></div>\n\n  <div class=\"spinner-container\"\n  *ngIf=\"!data\">\n    <md-spinner></md-spinner>\n  </div>\n  ",
            styles: ["\n  .spinner-container {\n    min-height: 325px;\n    padding-left: 40%;\n    padding-top: 10%;\n  }\n  "]
        }), 
        __metadata('design:paramtypes', [])
    ], ChartComponent);
    return ChartComponent;
}());
//# sourceMappingURL=chart.component.js.map