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
var Angular2_csv_1 = require("angular2-csv/Angular2-csv");
var date_1 = require("../../../../classes/helpers/date");
var D3 = require("d3");
var LearnerStatComponent = (function () {
    function LearnerStatComponent() {
        this.pieData = [];
        this.headerMin = false;
        this.groupBy = [];
        this.max = 0;
        this.lines = [];
        this.colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#CDDC39", "#673AB7", "#03a9f4", "#ffeb3b", "#e91e63", "#607d8b", "#8bc34a", "#ee6e73", "#000000", "#000000", "#000000"];
        this.datesChanged = new core_1.EventEmitter();
        this.export = new core_1.EventEmitter();
        this.types = [
            {
                text: "Unknown",
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
        this.data = this.data.filter(function (x) { return x.points > 0; });
        var d2 = [];
        for (var d = new Date(this.date1); d < this.date2;) {
            for (var i = 0; i < this.types.length; i++) {
                d2.push({
                    createdAt: new Date(d),
                    userPointType: this.types[i].value,
                    points: 0
                });
            }
            d.setDate(d.getDate() + 1);
        }
        var _loop_1 = function (i) {
            filteredSet = this_1.data
                .filter(function (x) {
                var pDate = new Date(x.createdAt);
                return x.userPointType == d2[i].userPointType &&
                    new Date(pDate.getFullYear(), pDate.getMonth(), pDate.getDate(), 0, 0, 0).valueOf() == d2[i].createdAt.valueOf();
            });
            d2[i].points = filteredSet.map(function (x) { return x.points; }).reduce(function (a, b) { return a + b; }, 0);
        };
        var this_1 = this, filteredSet;
        for (var i = 0; i < d2.length; i++) {
            _loop_1(i);
        }
        this.data = d2.filter(function (x) { return x.points > 0; });
        this.groupPieData();
    };
    LearnerStatComponent.prototype.groupPieData = function () {
        this.groupBy = [];
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
        this.groupBy = this.groupBy.filter(function (x) { return x.points > 0; });
    };
    LearnerStatComponent.prototype.ngOnInit = function () {
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
    };
    LearnerStatComponent.prototype.ngAfterViewInit = function () {
        this.htmlElement = this.element.nativeElement;
        this.host = D3.select(this.htmlElement);
        this.updatePieData();
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
    LearnerStatComponent.prototype.setMaxHeight = function () {
        var m = 10;
        if (this.data && this.data.length > 0)
            m = Math.max.apply(null, this.data.map(function (x) { return x.points; }));
        this.max = m >= 10 ? m : 10;
        this.setLines();
    };
    LearnerStatComponent.prototype.setLines = function () {
        var r = [];
        if (this.max && this.max > 10) {
            var m = 10;
            for (var i = 10; i > 0; i--) {
                if (this.max % i === 0) {
                    m = i;
                    break;
                }
            }
            var p = this.max / m;
            for (var i_1 = 0; i_1 < this.max;) {
                r.push(Math.round(i_1));
                i_1 += p;
            }
        }
        else
            r = this.dummyArray(10);
        this.lines = r;
    };
    LearnerStatComponent.prototype.displayedDates = function () {
        var days = [];
        var l = this.data.length - 1;
        for (var d = new Date(this.date1); d <= new Date(this.date2); d.setDate(d.getDate() + 1)) {
            days.push(new Date(d));
        }
        if (days.length < 20)
            return days;
        var m = Math.round(days.length / 20);
        var s = [];
        s.push(days[0]);
        for (var i = 1; i < days.length - 1; i++) {
            if (i % m === 0)
                s.push(days[i]);
        }
        s.push(days[days.length - 1]);
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
    LearnerStatComponent.prototype.updatePieData = function () {
        this.pieData = [];
        for (var i = 0; i < this.groupBy.length; i++) {
            this.pieData.push({
                label: parseFloat(this.groupBy[i].percent).toFixed(1) + '%',
                value: this.groupBy[i].percent,
                group: this.groupBy[i].group
            });
        }
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
            return pieColor(_this.pieData[index].group);
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
    LearnerStatComponent.prototype.updatePie = function () {
        this.groupPieData();
        this.svg.remove();
        this.buildSVG();
        this.updatePieData();
        this.buildPie();
    };
    LearnerStatComponent.prototype.updateStartDate = function (e) {
        this.setMinDate(e.fullDate);
        this.date1 = e.fullDate;
        this.date1 = new Date(this.date1.getFullYear(), this.date1.getMonth(), this.date1.getDate(), 0, 0, 0);
        if (new Date(this.date2) < e.fullDate) {
            this.updateEndDate(e);
        }
        this.updateDateFilter();
    };
    LearnerStatComponent.prototype.setMinDate = function (e) {
        this.minDay = e.getDate();
        this.minMonth = e.getMonth();
        this.minYear = e.getFullYear();
    };
    LearnerStatComponent.prototype.updateEndDate = function (e) {
        this.date2.setDate(e.fullDate.getDate() + 1);
        this.date2 = new Date(e.fullDate.getFullYear(), e.fullDate.getMonth(), e.fullDate.getDate(), 23, 59, 59);
        this.updateDateFilter();
    };
    LearnerStatComponent.prototype.updateDateFilter = function () {
        var _this = this;
        if (this.date1) {
            if (this.date2)
                this.data = this.fullData.filter(function (x) { var date = new Date(x.createdAt); return (date >= _this.date1) && date <= _this.date2; });
            else
                this.data = this.fullData.filter(function (x) { return new Date(x.createdAt) >= _this.date1; });
        }
        else if (this.date2)
            this.data = this.fullData.filter(function (x) { return new Date(x.createdAt) <= _this.date2; });
        this.dDates = this.displayedDates();
        this.dateRange = this.getDateDiff(this.date1, this.date2) + 1;
        this.setMaxHeight();
        this.updatePie();
    };
    LearnerStatComponent.prototype.getDateOffset = function (d) {
        var p = 100 / this.dateRange;
        var diff = this.getDateDiff(this.date1, d.createdAt);
        var r = (p * diff) + (((100 / this.dateRange) / 5) * (d.userPointType));
        return r;
    };
    LearnerStatComponent.prototype.getDateDiff = function (d1, d2) {
        var startDay = new Date(d1);
        var endDay = new Date(d2);
        var millisecondsPerDay = 1000 * 60 * 60 * 24;
        var millisBetween = endDay.getTime() - startDay.getTime();
        return Math.floor(millisBetween / millisecondsPerDay);
    };
    LearnerStatComponent.prototype.raiseExport = function () {
        var _this = this;
        var report = this.data.slice(0).map(function (s, index, array) {
            return {
                createdAt: date_1.DateEx.formatDate(s.createdAt, 'dd/MM/yyyy'),
                userPointType: _this.types.filter(function (x) { return x.value == s.userPointType; })[0].text,
                points: s.points
            };
        });
        report.unshift({ 'createdAt': 'Date Earned', 'userPointType': 'Activity Type', 'points': 'Points Earned' });
        new Angular2_csv_1.Angular2Csv(report, this.user.currentUser.firstName + this.user.currentUser.lastName + date_1.DateEx.formatDate(new Date()));
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