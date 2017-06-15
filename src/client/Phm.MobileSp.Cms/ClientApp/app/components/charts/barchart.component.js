"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Chartclasses = require("../../models/chartclasses");
var BarChartData = Chartclasses.BarChartData;
var d3 = require("d3-selection");
var d3Scale = require("d3-scale");
var d3Array = require("d3-array");
var d3Axis = require("d3-axis");
var BarChart = (function () {
    function BarChart() {
        this.chartData = new BarChartData({
            xLegend: "Allocated time / Submitted by day",
            yLegend: "Number of learners"
        });
    }
    BarChart.prototype.ngOnInit = function () {
        this.initTip();
        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawBars();
    };
    BarChart.prototype.initTip = function () {
        this.tooltip = d3.select("body").append("div").attr("class", "toolTip");
    };
    BarChart.prototype.initSvg = function () {
        this.svg = d3.select("svg");
        this.width = +this.chartData.width - this.chartData.margin.left - this.chartData.margin.right;
        this.height = +this.chartData.height - this.chartData.margin.top - this.chartData.margin.bottom;
        this.g = this.svg.append("g")
            .attr("transform", "translate(" + this.chartData.margin.left + "," + this.chartData.margin.top + ")");
    };
    BarChart.prototype.initAxis = function () {
        this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.8);
        this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
        this.x.domain(this.chartData.chartData.map(function (d) { return d.x; }));
        this.y.domain([0, d3Array.max(this.chartData.chartData, function (d) { return d.y; })]);
    };
    BarChart.prototype.drawAxis = function () {
        this.g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + this.height + ")")
            .call(d3Axis.axisBottom(this.x));
        //this.g.append("g")
        //    .attr("class", "axis axis--y")
        //    .call(d3Axis.axisLeft(this.y).ticks(10, "%"));
    };
    BarChart.prototype.drawBars = function () {
        var _this = this;
        this.g.selectAll(".bar")
            .data(this.chartData.chartData)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("fill", '#9F378E')
            .attr("x", function (d) { return _this.x(d.x); })
            .attr("y", function (d) { return _this.y(d.y); })
            .attr("width", this.x.bandwidth())
            .attr("height", function (d) { return _this.height - _this.y(d.y); })
            .on("mousemove", function (d) {
            _this.tooltip
                .style("left", d3.event.pageX - 20 + "px")
                .style("top", d3.event.pageY - 20 + "px")
                .style("display", "inline-block")
                .html(d.y);
        })
            .on("mouseout", function (d) { _this.tooltip.style("display", "none"); });
        this.g.selectAll(".bar")
            .data(this.chartData.chartData)
            .enter().append("rect")
            .attr("class", "base-bar")
            .attr("fill", '#DFDFDF')
            .attr("x", function (d) { return _this.x(d.x); })
            .attr("y", function () { return _this.chartData.height; })
            .attr("width", this.x.bandwidth())
            .attr("height", function () { return _this.chartData.height; });
    };
    return BarChart;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", BarChartData)
], BarChart.prototype, "chartData", void 0);
BarChart = __decorate([
    core_1.Component({
        selector: 'barchart',
        template: require('./barchart.component.html'),
        styles: [require('./barchart.component.css')]
    }),
    __metadata("design:paramtypes", [])
], BarChart);
exports.BarChart = BarChart;
//# sourceMappingURL=barchart.component.js.map