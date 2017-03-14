import { Component, OnChanges,
         AfterViewInit, Input, ElementRef, ViewChild } from '@angular/core';
const d3 = require('d3');
import { Sales } from '../models/sales.model';
import { Margin } from '../models/margin.model';
import * as moment from 'moment';

@Component({
  selector: 'app-chart',
  template: `
  <div #container></div>

  <div class="spinner-container"
  *ngIf="!data">
    <md-spinner></md-spinner>
  </div>
  `,
  styles: [`
  .spinner-container {
    min-height: 325px;
    padding-left: 40%;
    padding-top: 10%;
  }
  `]
})
export class ChartComponent implements AfterViewInit, OnChanges {

  @Input() data: Array<Sales> = [];
  @ViewChild('container') element: ElementRef;
  private host: any;
  private svg: any;
  private margin: Margin;
  width: number = 0;
  private height: number;
  private xScale: any;
  private yScale: any;
  private xAxis: any;
  private yAxis: any;
  private htmlElement: HTMLElement;

  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = d3.select(this.htmlElement);

    if(!this.data || this.data.length === 0 || !this.host || this.data === null) return;


    this.setup();
    this.buildSVG();
    this.drawXAxis();
    this.drawYAxis();
    this.populate();
  }


  ngOnChanges(): void {

    if(!this.data || this.data.length === 0 || !this.host || this.data === null) return;

    this.setup();
    this.buildSVG();
    this.drawXAxis();
    this.drawYAxis();
    this.populate();
  }


  setup(): void {
    try {
      this.margin = { top: 20, right: 20, left: 40, bottom: 40 };
      this.width = this.htmlElement.clientWidth - this.margin.left - this.margin.right;
      this.height = (this.width * 0.5) - this.margin.top - this.margin.bottom;

      this.xScale = d3.scaleTime()
                    .domain([d3.min(this.data, (d: any) => d.date),
                             d3.max(this.data, (d: any) => d.date)])
                    .range([0, this.width]);

      this.yScale = d3.scaleLinear()
                    .domain([d3.min(this.data, (d: any) => d.total),
                             d3.max(this.data, (d: any) => d.total)])
                    .range([this.height, 0]);

    } catch(err) {
      console.log('D3 setup error');
    }

  }

  buildSVG(): void {
    this.host.html('');
    this.svg = this.host
                   .append('svg')
                     .attr('width', this.width)
                     .attr('height', this.height)
                     .call(responsivefy)
                   .append('g')
                     .attr('transform', `translate(${this.margin.left},
                                                   ${this.margin.top})`);

    function responsivefy(svg: any): void {

      let margin = { top: 20, right: 20, left: 40, bottom: 40 };
      var container = d3.select(svg.node().parentNode);

      var width = parseInt(svg.style('width'));
      var height = parseInt(svg.style('height'));
      var aspect = width / height;


      svg.attr('viewBox', `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
         .attr('preserveAspectRatio', 'xMinYMid')
         .call(resize);


      d3.select(window).on('resize.' + container.attr('id'), resize);

      function resize() {
        var targetWidth = parseInt(container.style('width'));

        svg.attr('width', targetWidth);
        svg.attr('height', Math.round(targetWidth/aspect));
      }
    }
  }

  drawXAxis(): void {

    this.svg.append('g')
            .attr('transform', `translate(0, ${this.height})`)
            .call(d3.axisBottom(this.xScale).ticks(6));
  }

  drawYAxis(): void {

    this.svg.append('g')
            .call(d3.axisLeft(this.yScale));
  }

  populate(): void {

    var line = d3.line()
                 .x((d: any) => this.xScale(d.date))
                 .y((d: any) => this.yScale(d.total))
                 .curve(d3.curveCatmullRom.alpha(0.9));

    this.svg.selectAll('.line')
            .data(this.data)
            .enter()
            .append('path')
            .attr('class', 'line')
            .attr('d', (d: any) => line(this.data))
            .style('stroke', 'red')
            .style('stroke-width', 2)
            .style('fill', 'none');
  }
}
