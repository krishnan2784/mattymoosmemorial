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
    //public tooltip;
    //private width: number;
    //private height: number;
    //private x: any;
    //private y: any;
    //private svg: any;
    //private g: any;
    function BarChart() {
        this.chartData = new BarChartData({});
    }
    BarChart.prototype.ngOnInit = function () {
        var _this = this;
        var columns = this.chartData.chartData.map(function (d) {
            return [d.name].concat(d.data.map(function (data) { return data.y.toString(); }));
        });
        var groups = [];
        //if (this.chartData.chartData.length === 1) {
        //    var max = 0;
        //    this.chartData.chartData[0].data.forEach((x) => {
        //        if (x.y > max)
        //            max = x.y;
        //    });
        //    var maxString = max.toString();
        //    columns.unshift(['baseData'].concat(this.chartData.chartData[0].data.map(() => { return maxString; })));
        //    groups.unshift(['baseData', this.chartData.chartData[0].name]);
        //}
        this.chart = c3.generate({
            bindto: '#chart',
            size: {
                height: this.chartData.height,
                width: this.chartData.width
            },
            padding: {
                top: this.chartData.margin.top,
                bottom: this.chartData.margin.bottom,
                left: this.chartData.margin.left,
                right: this.chartData.margin.right
            },
            data: {
                columns: columns,
                type: 'bar',
                color: function (color, d) {
                    var name = '';
                    if (d.id) {
                        name = d.id;
                    }
                    else
                        name = d;
                    if (name === 'baseData')
                        return '#DFDFDF';
                    if (_this.chartData &&
                        _this.chartData.chartData &&
                        _this.chartData.chartData.filter(function (x) { return x.name === name; }).length > 0) {
                        if (_this.chartData.chartData.filter(function (x) { return x.name === name; })[0].colour !== '')
                            return _this.chartData.chartData.filter(function (x) { return x.name === name; })[0].colour;
                    }
                    return color;
                }, groups: groups
            },
            bar: {
                width: {
                    ratio: 0.5
                }
            },
            tooltip: {
                format: {
                    title: function (d) { return _this.chartData.xLegend + ': ' + d; }
                }
            }
        });
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