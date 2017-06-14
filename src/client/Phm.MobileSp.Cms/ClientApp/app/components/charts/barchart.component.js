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
var BarChart = (function () {
    function BarChart() {
    }
    BarChart.prototype.ngOnInit = function () {
        this.initChart();
    };
    BarChart.prototype.initChart = function () {
        var chartData = this.chartData;
        var barData = chartData.chartData;
        var vis = d3.select(this.barChartElement.nativeElement), width = chartData.width, height = chartData.height, margins = {
            top: chartData.margins.top,
            right: chartData.margins.right,
            bottom: chartData.margins.bottom,
            left: chartData.margins.left
        }, xRange = d3.scale.ordinal().rangeRoundBands([margins.left, width - margins.right], 0.1)
            .domain(barData.map(function (d) {
            return d.x;
        })), yRange = d3.scale.linear().range([height - margins.top, margins.bottom]).domain([0,
            d3.max(barData, function (d) {
                return d.y;
            })
        ]), xAxis = d3.svg.axis()
            .scale(xRange)
            .tickSize(5)
            .tickSubdivide(true), yAxis = d3.svg.axis()
            .scale(yRange)
            .tickSize(5)
            .orient("left")
            .tickSubdivide(true);
        vis.append('svg:g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + (height - margins.bottom) + ')')
            .call(xAxis);
        vis.append('svg:g')
            .attr('class', 'y axis')
            .attr('transform', 'translate(' + (margins.left) + ',0)')
            .call(yAxis);
        vis.selectAll('rect')
            .data(barData)
            .enter()
            .append('rect')
            .attr('x', function (d) {
            return xRange(d.x);
        })
            .attr('y', function (d) {
            return yRange(d.y);
        })
            .attr('width', xRange.rangeBand())
            .attr('height', function (d) {
            return ((height - margins.bottom) - yRange(d.y));
        })
            .attr('fill', 'grey')
            .on('mouseover', function (d) {
            d3.select(this)
                .attr('fill', 'blue');
        })
            .on('mouseout', function (d) {
            d3.select(this)
                .attr('fill', 'grey');
        });
    };
    return BarChart;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", BarChartData)
], BarChart.prototype, "chartData", void 0);
__decorate([
    core_1.ViewChild('barChart'),
    __metadata("design:type", Object)
], BarChart.prototype, "barChartElement", void 0);
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