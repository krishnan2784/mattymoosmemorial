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
var DonutChartData = Chartclasses.DonutChartData;
var DonutChart = (function () {
    function DonutChart() {
    }
    DonutChart.prototype.ngOnInit = function () {
        if (!this.id)
            this.id = 'chart_' + this.chartData.title.replace(' ', '_');
    };
    DonutChart.prototype.ngAfterViewInit = function () {
        var _this = this;
        var columns = this.chartData.chartData.map(function (d) {
            return [d.name].concat(d.data.map(function (data) { return data.toString(); }));
        });
        this.chart = c3.generate({
            bindto: '#' + this.id,
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
                type: 'donut',
                onclick: function (d, i) { },
                onmouseover: function (d, i) { },
                onmouseout: function (d, i) { },
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
                }
            },
            donut: {
                title: this.chartData.title,
                width: this.chartData.donutThickness,
                label: {
                    show: false
                }
            },
            legend: {
                show: this.chartData.showLegend,
                //inset: {
                //    anchor: 'top-left',
                //    x: 20,
                //    y: 10
                //},
                item: {
                    onclick: function (id) { }
                }
            },
            tooltip: {
                show: this.chartData.showTooltip
            }
        });
    };
    return DonutChart;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DonutChart.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", DonutChartData)
], DonutChart.prototype, "chartData", void 0);
DonutChart = __decorate([
    core_1.Component({
        selector: 'donutchart',
        template: require('./donutchart.component.html'),
        styles: [require('./donutchart.component.css')]
    }),
    __metadata("design:paramtypes", [])
], DonutChart);
exports.DonutChart = DonutChart;
//# sourceMappingURL=donutchart.component.js.map