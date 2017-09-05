import { Component, Input, Output, EventEmitter, OnInit, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { DateEx } from "../../../../classes/helpers/date";

import * as D3 from 'd3';
import { UserPointType } from "../../../../enums";
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
  fullData;
  dDates;
  groupBy = [];
  max = 0;
  lines = [];
  date1;
  date2;
  dateRange;
  minDay;
  minMonth;
  minYear;
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
      this.data = this.data.filter(x => x.points > 0);
      let d2 = [];

      for (var d = new Date(this.date1); d < this.date2;) {
          for (let i = 0; i < this.types.length; i++) {
              d2.push({
                  createdAt: new Date(d),
                  userPointType: this.types[i].value,
                  points: 0
              });
          }
          d.setDate(d.getDate() + 1);
      }
      for (let i = 0; i < d2.length; i++) {
          var filteredSet = this.data
              .filter(x => {
                  var pDate = new Date(x.createdAt);
                  return x.userPointType == d2[i].userPointType &&
                      new Date(pDate.getFullYear(), pDate.getMonth(), pDate.getDate(), 0, 0, 0).valueOf() == d2[i].createdAt.valueOf();
              });
          d2[i].points = filteredSet.map(x => x.points).reduce((a, b) => a + b, 0);
      }
      this.data = d2.filter(x => x.points > 0);
      this.groupPieData();
    }
  groupPieData() {
    this.groupBy = [];
    for(let i=0; i < this.types.length; i++) {
        this.groupBy.push({
            group: this.types[i].value,
            points: 0,
            percent: 0
        });
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
    this.groupBy = this.groupBy.filter(x=>x.points > 0);
  }
  ngOnInit() {
      this.date1 = new Date(this.data[0].createdAt);
      this.date1 = new Date(this.date1.getFullYear(), this.date1.getMonth(), this.date1.getDate(), 0, 0, 0);
      this.date2 = new Date(this.data[this.data.length - 1].createdAt);
      this.date2 = new Date(this.date2.getFullYear(), this.date2.getMonth(), this.date2.getDate(), 23, 59, 59);
      this.setMinDate(this.date1);
      this.dateRange = this.getDateDiff(this.date1, this.date2) + 1;
      this.dDates = this.displayedDates();
      this.groupIt();
      this.setMaxHeight();
      this.fullData = this.data;
  }
  ngAfterViewInit() {
    this.htmlElement = this.element.nativeElement;
    this.host = D3.select(this.htmlElement);
    this.updatePieData();
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
  setMaxHeight() {
      var m = 10;
      if (this.data && this.data.length > 0) 
          m = Math.max.apply(null, this.data.map(x => x.points));
      this.max = m >= 10 ? m : 10;
      this.setLines();
  }
  setLines() {
      let r = [];
      if (this.max && this.max > 10) {
          var p = Math.round(this.max / 10);
          for (let i = 0; i < this.max;) {
              r.push(i);
              i += p;
          }
      } else
          r = this.dummyArray(10); 

      this.lines = r;
  }
  displayedDates() {
    let days = [];
    let l = this.data.length - 1;
    for (let d = new Date(this.date1); d <= new Date(this.date2); d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    if (days.length < 20)
        return days;

    let m = Math.round(days.length / 20);
    let s = [];
    s.push(days[0]);
    for (var i = 1; i < days.length - 1; i++) {
        if (i % m === 0)
            s.push(days[i]);
    }
    s.push(days[days.length-1]);
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
  private updatePieData() {
      this.pieData = [];
      for (let i = 0; i < this.groupBy.length; i++) {
          this.pieData.push(
              {
                  label: parseFloat(this.groupBy[i].percent).toFixed(1) + '%',
                  value: this.groupBy[i].percent,
                  group: this.groupBy[i].group
              }
          );
      }
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
          return pieColor(this.pieData[index].group);
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
  updatePie() {
      this.groupPieData();
      this.svg.remove();
      this.buildSVG();
      this.updatePieData();
      this.buildPie();
  }
  updateStartDate(e) {
      this.setMinDate(e.fullDate);
      this.date1 = e.fullDate;
      this.date1 = new Date(this.date1.getFullYear(), this.date1.getMonth(), this.date1.getDate(), 0, 0, 0);
      if (new Date(this.date2) < e.fullDate) {
          this.updateEndDate(e);
      }
      this.updateDateFilter();
  }
    setMinDate(e) {
        this.minDay = e.getDate();
        this.minMonth = e.getMonth();
        this.minYear = e.getFullYear();
    }
  updateEndDate(e) {
      this.date2.setDate(e.fullDate.getDate() + 1);
      this.date2 = new Date(e.fullDate.getFullYear(), e.fullDate.getMonth(), e.fullDate.getDate(), 23, 59, 59);
      this.updateDateFilter();
  }
  updateDateFilter() {
      if (this.date1) {
          if (this.date2)
              this.data = this.fullData.filter((x) => { var date = new Date(x.createdAt); return (date >= this.date1) && date <= this.date2 });
          else
              this.data = this.fullData.filter((x) => new Date(x.createdAt) >= this.date1);
      } else if (this.date2)
          this.data = this.fullData.filter((x) => new Date(x.createdAt) <= this.date2);
      this.dDates = this.displayedDates();
      this.dateRange = this.getDateDiff(this.date1, this.date2) + 1;
      this.setMaxHeight();
      this.updatePie();
  }
  getDateOffset(d) {
      var p = 100 / this.dateRange;
      var diff = this.getDateDiff(this.date1, d.createdAt);
      var r = (p * diff) + (((100 / this.dateRange) / 5) * (d.userPointType));
      return r;
  }
  getDateDiff(d1, d2) {
      var startDay = new Date(d1);
      var endDay = new Date(d2);
      var millisecondsPerDay = 1000 * 60 * 60 * 24;
      var millisBetween = endDay.getTime() - startDay.getTime();
      return Math.floor(millisBetween / millisecondsPerDay);
  }
  raiseExport() {  
      let report = this.data.slice(0).map((s, index, array) => {
          return {
              createdAt: s.createdAt,
              userPointType: this.types.filter(x=>x.value == s.userPointType)[0].text,
              points: s.points
          };
      });
      report.unshift({ 'createdAt': 'Date Earned', 'userPointType': 'Activity Type', 'points': 'Points Earned' });      
      new Angular2Csv(report, this.user.currentUser.firstName + this.user.currentUser.lastName + DateEx.formatDate(new Date()));
  }
}
