"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseChart = (function () {
    function BaseChart(options) {
        if (options === void 0) { options = {}; }
        this.title = options['title'] = '';
        this.width = options['width'] || 300;
        this.height = options['height'] || 200;
        this.margin = options['margin'] || {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        };
    }
    return BaseChart;
}());
exports.BaseChart = BaseChart;
var BarChartData = (function (_super) {
    __extends(BarChartData, _super);
    function BarChartData(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.xLegend = options['xLegend'] || 'Allocated time / Submitted by day';
        _this.yLegend = options['yLegend'] || 'Number of learners';
        _this.chartData = options['chartData'] || [{
                x: 1,
                y: 5
            }, {
                x: 2,
                y: 20
            }, {
                x: 3,
                y: 10
            }, {
                x: 4,
                y: 40
            }, {
                x: 5,
                y: 5
            }, {
                x: 6,
                y: 60
            }];
        return _this;
    }
    return BarChartData;
}(BaseChart));
exports.BarChartData = BarChartData;
//# sourceMappingURL=chartclasses.js.map