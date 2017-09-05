import { Component, Input, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import * as D3 from 'd3';
@Component({
  selector: 'dynamicchartformats',
  template: require('./dynamicchartformats.html'),
  styles: [require('./dynamicchartformats.css')],
})
export class DynamicChartFormatsComponent implements AfterViewInit, OnInit  {
  @ViewChild("containerPieChart") element: ElementRef;
  @Input() data: any;
  private host: D3.Selection<any>;
  private svg: D3.Selection<any>;
  private width: number;
  private height: number;
  private radius: number;
  private htmlElement: HTMLElement;
  colors =  ["#1f77b4","#ff7f0e", "#2ca02c","#d62728", "#CDDC39", "#673AB7", "#03a9f4","#ffeb3b","#e91e63","#607d8b","#8bc34a","#ee6e73","#000000","#000000","#000000"];
  graphType = 0;
  pieData =  [];
  bar7H = 0;
  ani =0;
  ngOnInit () {
    if(this.data.data.length <=4 ) {
      this.graphType = 1;
    }
    if(this.data.data.length === 5 || this.data.data.length === 6 ) {
      this.graphType = 2;
    }
    if(this.data.data.length >= 7) {
      this.bar7H = 100 / this.data.data.length;
      this.graphType = 3;
    }
    setTimeout(() => this.ani = 1, 1500);
  }
  ngAfterViewInit() {
    if(this.graphType === 1 ) {
      this.htmlElement = this.element.nativeElement;
      this.host = D3.select(this.htmlElement);
      for (let i = 0; i < this.data.data.length; i++) {
          if (this.data.data[i].percent > 0)
              this.pieData.push(
                  {
                    label: this.data.data[i].percent + '%',
                    value: this.data.data[i].percent
                  });
      }
      this.setup();
      this.buildSVG();
      this.buildPie();
    }
  }
  private setup(): void {
    this.width = 80;
    this.height = 80;
    this.radius = Math.min(this.width, this.height) / 2;
  }
  private buildSVG(): void {
    this.host.html("");
    this.svg = this.host.append("svg")
      .attr("viewBox", `-12 -12 ${this.width} ${this.height}`)
      .append("g")
      .attr("transform", `translate(${this.width / 4},${this.height / 4})`);
  }
  private buildPie(): void {
    let pie = D3.layout.pie();
    let values = this.pieData.map(data => data.value);
    let arcSelection = this.svg.selectAll(".arc")
      .data(pie(values))
      .enter()
      .append("g")
      .attr("class", "arc");
    this.populatePie(arcSelection);
  }
  private populatePie(arcSelection: D3.Selection<D3.layout.pie.Arc<number>>): void {
    let outerRadius = this.radius - 10;
    let arc = D3.svg.arc<D3.layout.pie.Arc<number>>()
      .outerRadius(outerRadius);
    arcSelection.append("path")
      .attr("d", arc)
      .attr("fill", (datum, index) => {
        return this.colors[index];
      });

    arcSelection.append("text")
      .attr("transform", (datum: any) => {
        datum.innerRadius = 0;
        datum.outerRadius = outerRadius;
        return "translate(" + arc.centroid(datum) + ")";
      })
      .text((datum, index) => this.pieData[index].label)
      .style("text-anchor", "middle");
  }
  getChar (c){
    return String.fromCharCode(c);
  }
}
