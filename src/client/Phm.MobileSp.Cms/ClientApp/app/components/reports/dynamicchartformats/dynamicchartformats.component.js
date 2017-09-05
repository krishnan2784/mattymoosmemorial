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
var D3 = require("d3");
var DynamicChartFormatsComponent = (function () {
    function DynamicChartFormatsComponent() {
        this.colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#CDDC39", "#673AB7", "#03a9f4", "#ffeb3b", "#e91e63", "#607d8b", "#8bc34a", "#ee6e73", "#000000", "#000000", "#000000"];
        this.graphType = 0;
        this.pieData = [];
        this.bar7H = 0;
        this.ani = 0;
    }
    DynamicChartFormatsComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.data.data.length <= 4) {
            this.graphType = 1;
        }
        if (this.data.data.length === 5 || this.data.data.length === 6) {
            this.graphType = 2;
        }
        if (this.data.data.length >= 7) {
            this.bar7H = 100 / this.data.data.length;
            this.graphType = 3;
        }
        setTimeout(function () { return _this.ani = 1; }, 1500);
    };
    DynamicChartFormatsComponent.prototype.ngAfterViewInit = function () {
        if (this.graphType === 1) {
            this.htmlElement = this.element.nativeElement;
            this.host = D3.select(this.htmlElement);
            for (var i = 0; i < this.data.data.length; i++) {
                if (this.data.data[i].percent > 0)
                    this.pieData.push({
                        label: this.data.data[i].percent + '%',
                        value: this.data.data[i].percent
                    });
            }
            this.setup();
            this.buildSVG();
            this.buildPie();
        }
    };
    DynamicChartFormatsComponent.prototype.setup = function () {
        this.width = 80;
        this.height = 80;
        this.radius = Math.min(this.width, this.height) / 2;
    };
    DynamicChartFormatsComponent.prototype.buildSVG = function () {
        this.host.html("");
        this.svg = this.host.append("svg")
            .attr("viewBox", "-12 -12 " + this.width + " " + this.height)
            .append("g")
            .attr("transform", "translate(" + this.width / 4 + "," + this.height / 4 + ")");
    };
    DynamicChartFormatsComponent.prototype.buildPie = function () {
        var pie = D3.layout.pie();
        var values = this.pieData.map(function (data) { return data.value; });
        var arcSelection = this.svg.selectAll(".arc")
            .data(pie(values))
            .enter()
            .append("g")
            .attr("class", "arc");
        this.populatePie(arcSelection);
    };
    DynamicChartFormatsComponent.prototype.populatePie = function (arcSelection) {
        var _this = this;
        var outerRadius = this.radius - 10;
        var arc = D3.svg.arc()
            .outerRadius(outerRadius);
        arcSelection.append("path")
            .attr("d", arc)
            .attr("fill", function (datum, index) {
            return _this.colors[index];
        });
        arcSelection.append("text")
            .attr("transform", function (datum) {
            datum.innerRadius = 0;
            datum.outerRadius = outerRadius;
            return "translate(" + arc.centroid(datum) + ")";
        })
            .text(function (datum, index) { return _this.pieData[index].label; })
            .style("text-anchor", "middle");
    };
    DynamicChartFormatsComponent.prototype.getChar = function (c) {
        return String.fromCharCode(c);
    };
    return DynamicChartFormatsComponent;
}());
__decorate([
    core_1.ViewChild("containerPieChart"),
    __metadata("design:type", core_1.ElementRef)
], DynamicChartFormatsComponent.prototype, "element", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DynamicChartFormatsComponent.prototype, "data", void 0);
DynamicChartFormatsComponent = __decorate([
    core_1.Component({
        selector: 'dynamicchartformats',
        template: require('./dynamicchartformats.html'),
        styles: [require('./dynamicchartformats.css')],
    })
], DynamicChartFormatsComponent);
exports.DynamicChartFormatsComponent = DynamicChartFormatsComponent;
//# sourceMappingURL=dynamicchartformats.component.js.map