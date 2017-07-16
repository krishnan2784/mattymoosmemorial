import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { DateEx } from "../../../../classes/helpers/date";

import * as D3 from 'd3';
@Component({
  selector: 'learnerstat',
  template: require('./learnerstat.html'),
  styles: [require('./learnerstat.css')]
})
export class LearnerStatComponent implements OnInit, AfterViewInit {
  @ViewChild("containerPieChart") element: ElementRef;
  private htmlElement: HTMLElement;
  private host: D3.Selection<any>;
  private svg: D3.Selection<any>;
  private width: number;
  private height: number;
  private radius: number;
  pieData =  [];
  headerMin = false;
  @Input() data;
  @Input() user;
  dDates;
  groupBy = [];
  max = 0;
  date1;
  date2;
  colors =  ["#1f77b4","#ff7f0e", "#2ca02c","#d62728", "#CDDC39", "#673AB7", "#03a9f4","#ffeb3b","#e91e63","#607d8b","#8bc34a","#ee6e73","#000000","#000000","#000000"];
  @Output() datesChanged: EventEmitter<any> = new EventEmitter();
  @Output() export: EventEmitter<any> = new EventEmitter();
  types = [
    {
      text: "Unknown",
      value : 0
    },
    {
      text: "Quiz",
      value : 1
    },
    {
      text: "Text",
      value : 2
    },
    {
      text: "Video",
      value : 3
    },
    {
      text: "Survey",
      value : 4
    }
  ];
  groupIt() {
    for(let i=0; i < this.types.length; i++){
      this.groupBy.push ({
        group: this.types[i].value,
        points: 0,
        percent : 0
      })
    }
    let total = 0;
    for (let i = 0 ; i < this.data.length; i++) {
      let p = this.data[i].points;
      this.groupBy[this.data[i].userPointType].points = this.groupBy[this.data[i].userPointType].points + p;
      total = total + p;
    }
    for (let i=0; i < this.types.length; i++){
      this.groupBy[i].percent = this.groupBy[i].points / (total / 100) + '';
    }
    console.log(total , this.groupBy);
  }
  ngOnInit() {
    this.dDates = this.displayedDates();
    for (let i = 0 ; i < this.data.length; i++) {
      if(this.data[i].points > this.max) {
        this.max = this.data[i].points;
      }
    }
    this.groupIt();
  }
  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    for(let i=0 ; i < this.groupBy.length; i++) {
      this.pieData.push(
        {
          label: parseFloat(this.groupBy[i].percent).toFixed(1)  + '%',
          value: this.groupBy[i].percent
        }
      );
    }
    this.setup();
    this.buildSVG();
    this.buildPie();
  }
  dummyArray(d) {
    let r = [];
    for (let i = 0 ; i < d; i++) {
      r.push(i);
    }
    return r;
  }
  displayedDates() {
    let days = [];
    let l = this.data.length - 1;
    for (let d = new Date(this.data[0].createdAt); d <= new Date(this.data[l].createdAt); d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    if(days.length === 1) {
      return [];
    }
    if(days.length === 2) {
      return [days[0],undefined,undefined,undefined, days[l]];
    }
    if(days.length == 3) {
      return [days[0],undefined,days[1],undefined, days[2]];
    }
    if(days.length == 4) {
      return [days[0],days[1],undefined,days[2], days[3]];
    }
    let s = [];
    s.push(days[0]);
    let m = parseInt((days.length/2) + "");
    let bfm = parseInt((days.length /4) + "");
    let afm = parseInt((days.length /1.25) + "");
    console.log('m=',m)
    let middle = days[m - 1];
    let bfMiddle = days[bfm  - 1];
    let afMiddle = days[afm  - 1];
    s.push(bfMiddle);
    s.push(middle);
    s.push(afMiddle);
    s.push(days[days.length-1]);
    console.log(s);
    return s;
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
    let innerRadius = this.radius - 50;
    let outerRadius = this.radius - 10;
    let pieColor = D3.scale.category10();
    let arc = D3.svg.arc<D3.layout.pie.Arc<number>>()
      .outerRadius(outerRadius);
    arcSelection.append("path")
      .attr("d", arc)
      .attr("fill", (datum, index) => {
        return pieColor(this.pieData[index].label);
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
  raiseDatesChanged(){
    this.datesChanged.emit({
      date1: this.date1,
      date2: this.date2
    });

  }
  raiseExport() {
        let report = this.data.slice(0);    
        new Angular2Csv(report, this.user.currentUser.firstName + this.user.currentUser.lastName + DateEx.formatDate(new Date()));
  }
}
