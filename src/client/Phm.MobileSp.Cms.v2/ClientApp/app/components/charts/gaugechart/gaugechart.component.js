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
var GaugeChartData = Chartclasses.GaugeChartData;
var GaugeChart = (function () {
    function GaugeChart() {
    }
    GaugeChart.prototype.ngOnInit = function () {
        if (!this.id)
            this.id = 'chart_' + this.chartData.title.replace(' ', '_');
    };
    GaugeChart.prototype.ngAfterViewInit = function () {
        var _this = this;
        var columns = this.chartData.chartData.map(function (d) {
            return [d.name, d.data];
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
                type: 'gauge',
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
            gauge: {
                label: {
                    format: function (value, ratio) {
                        return _this.chartData.title;
                    },
                    show: this.chartData.showMinMaxLabels
                },
                min: this.chartData.min,
                max: this.chartData.max,
                units: ' ' + this.chartData.units,
                width: this.chartData.arcThickness
            },
            tooltip: {
                show: this.chartData.showTooltip,
                format: {
                    title: '',
                    name: function (name, ratio, id, index) { return id; },
                    value: function (name, ratio, id, index) { return ratio * 100 + '%'; }
                }
            }
            //color: {
            //    pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
            //    threshold: {
            //        //            unit: 'value', // percentage is default
            //        //            max: 200, // 100 is default
            //        values: [30, 60, 90, 100]
            //    }
            //},
        });
    };
    return GaugeChart;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], GaugeChart.prototype, "id", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", GaugeChartData)
], GaugeChart.prototype, "chartData", void 0);
GaugeChart = __decorate([
    core_1.Component({
        selector: 'gaugechart',
        template: require('./gaugechart.component.html'),
        styles: [require('./gaugechart.component.css')]
    }),
    __metadata("design:paramtypes", [])
], GaugeChart);
exports.GaugeChart = GaugeChart;
//# sourceMappingURL=gaugechart.component.js.map