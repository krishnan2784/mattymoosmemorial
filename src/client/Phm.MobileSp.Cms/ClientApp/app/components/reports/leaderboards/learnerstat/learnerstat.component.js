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
var LearnerStatComponent = (function () {
    function LearnerStatComponent() {
        this.pieData = [];
        this.headerMin = false;
        this.groupBy = [];
        this.max = 0;
        this.colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#CDDC39", "#673AB7", "#03a9f4", "#ffeb3b", "#e91e63", "#607d8b", "#8bc34a", "#ee6e73", "#000000", "#000000", "#000000"];
        this.datesChanged = new core_1.EventEmitter();
        this.export = new core_1.EventEmitter();
        this.types = [
            {
                text: "Unknow",
                value: 0
            },
            {
                text: "Quiz",
                value: 1
            },
            {
                text: "Text",
                value: 2
            },
            {
                text: "Video",
                value: 3
            },
            {
                text: "Survey",
                value: 4
            }
        ];
    }
    LearnerStatComponent.prototype.groupIt = function () {
        for (var i = 0; i < this.types.length; i++) {
            this.groupBy.push({
                group: this.types[i].value,
                points: 0,
                percent: 0
            });
        }
        var total = 0;
        for (var i = 0; i < this.data.length; i++) {
            var p = this.data[i].points;
            this.groupBy[this.data[i].userPointType].points = this.groupBy[this.data[i].userPointType].points + p;
            total = total + p;
        }
        for (var i = 0; i < this.types.length; i++) {
            this.groupBy[i].percent = this.groupBy[i].points / (total / 100) + '';
        }
        console.log(total, this.groupBy);
    };
    LearnerStatComponent.prototype.ngOnInit = function () {
        this.dDates = this.displayedDates();
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].points > this.max) {
                this.max = this.data[i].points;
            }
        }
        this.groupIt();
    };
    LearnerStatComponent.prototype.ngAfterViewInit = function () {
        this.htmlElement = this.element.nativeElement;
        this.host = D3.select(this.htmlElement);
        for (var i = 0; i < this.groupBy.length; i++) {
            this.pieData.push({
                label: parseFloat(this.groupBy[i].percent).toFixed(1) + '%',
                value: this.groupBy[i].percent
            });
        }
        this.setup();
        this.buildSVG();
        this.buildPie();
    };
    LearnerStatComponent.prototype.dummyArray = function (d) {
        var r = [];
        for (var i = 0; i < d; i++) {
            r.push(i);
        }
        return r;
    };
    LearnerStatComponent.prototype.displayedDates = function () {
        var days = [];
        var l = this.data.length - 1;
        for (var d = new Date(this.data[0].createdAt); d <= new Date(this.data[l].createdAt); d.setDate(d.getDate() + 1)) {
            days.push(new Date(d));
        }
        if (days.length === 1) {
            return [];
        }
        if (days.length === 2) {
            return [days[0], undefined, undefined, undefined, days[l]];
        }
        if (days.length == 3) {
            return [days[0], undefined, days[1], undefined, days[2]];
        }
        if (days.length == 4) {
            return [days[0], days[1], undefined, days[2], days[3]];
        }
        var s = [];
        s.push(days[0]);
        var m = parseInt((days.length / 2) + "");
        var bfm = parseInt((days.length / 4) + "");
        var afm = parseInt((days.length / 1.25) + "");
        console.log('m=', m);
        var middle = days[m - 1];
        var bfMiddle = days[bfm - 1];
        var afMiddle = days[afm - 1];
        s.push(bfMiddle);
        s.push(middle);
        s.push(afMiddle);
        s.push(days[days.length - 1]);
        console.log(s);
        return s;
    };
    LearnerStatComponent.prototype.setup = function () {
        this.width = 80;
        this.height = 80;
        this.radius = Math.min(this.width, this.height) / 2;
    };
    LearnerStatComponent.prototype.buildSVG = function () {
        this.host.html("");
        this.svg = this.host.append("svg")
            .attr("viewBox", "-12 -12 " + this.width + " " + this.height)
            .append("g")
            .attr("transform", "translate(" + this.width / 4 + "," + this.height / 4 + ")");
    };
    LearnerStatComponent.prototype.buildPie = function () {
        var pie = D3.layout.pie();
        var values = this.pieData.map(function (data) { return data.value; });
        var arcSelection = this.svg.selectAll(".arc")
            .data(pie(values))
            .enter()
            .append("g")
            .attr("class", "arc");
        this.populatePie(arcSelection);
    };
    LearnerStatComponent.prototype.populatePie = function (arcSelection) {
        var _this = this;
        var innerRadius = this.radius - 50;
        var outerRadius = this.radius - 10;
        var pieColor = D3.scale.category10();
        var arc = D3.svg.arc()
            .outerRadius(outerRadius);
        arcSelection.append("path")
            .attr("d", arc)
            .attr("fill", function (datum, index) {
            return pieColor(_this.pieData[index].label);
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
    LearnerStatComponent.prototype.raiseDatesChanged = function () {
        this.datesChanged.emit({
            date1: this.date1,
            date2: this.date2
        });
    };
    LearnerStatComponent.prototype.raiseExport = function () {
        this.export.emit({
            originalData: this.data,
            date1: this.date1,
            date2: this.date2,
            groupedData: this.groupBy
        });
    };
    return LearnerStatComponent;
}());
__decorate([
    core_1.ViewChild("containerPieChart"),
    __metadata("design:type", core_1.ElementRef)
], LearnerStatComponent.prototype, "element", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LearnerStatComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LearnerStatComponent.prototype, "user", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LearnerStatComponent.prototype, "datesChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LearnerStatComponent.prototype, "export", void 0);
LearnerStatComponent = __decorate([
    core_1.Component({
        selector: 'learnerstat',
        template: require('./learnerstat.html'),
        styles: [require('./learnerstat.css')]
    })
], LearnerStatComponent);
exports.LearnerStatComponent = LearnerStatComponent;
//# sourceMappingURL=learnerstat.component.js.map