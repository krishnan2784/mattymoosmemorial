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
var DatepickerComponent = (function () {
    function DatepickerComponent() {
        this.dateSelected = new core_1.EventEmitter();
        this.show = false;
        this.hidePastDays = false;
        this.today = new Date();
        this.thisDay = this.today.getDate();
        this.thisMonth = this.today.getMonth();
        this.thisYear = this.today.getFullYear();
        this.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.shortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.longWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'];
    }
    DatepickerComponent.prototype.ngOnInit = function () {
        if (!this.day || !this.jsMonth || !this.year) {
            var d = new Date();
            this.selectedDay = d.getDate();
            this.selectedMonth = d.getMonth();
            this.selectedYear = d.getFullYear();
            this.pastDays = this.dummyArrayGenerator(this.firstDayOfWeek(this.selectedMonth, this.selectedYear).index.uk);
        }
    };
    DatepickerComponent.prototype.pad = function (num, size) {
        var s = num + "";
        while (s.length < size)
            s = "0" + s;
        return s;
    };
    DatepickerComponent.prototype.dummyArrayGenerator = function (d) {
        var array = [];
        for (var i = 0; i < d; i++) {
            array.push(i);
        }
        return array;
    };
    DatepickerComponent.prototype.checkPastDay = function (d) {
        var g = new Date(this.selectedYear, this.selectedMonth, d);
        var x = this.isDayOnPast(g);
        return x;
    };
    DatepickerComponent.prototype.normalizeDate = function (d) {
        var a = this.pad(d.getMonth() + 1, 2) + '/ ' + this.pad(d.getDate(), 2) + "/" + "/" + d.getFullYear();
        var b = this.pad(d.getHours(d), 2);
        var c = this.pad(d.getMinutes(d), 2);
        var r = new Date(a + ' ' + b + ':' + c);
        r.setSeconds(0);
        r.setMilliseconds(0);
        r.setHours(0);
        r.setMinutes(0);
        return r;
    };
    DatepickerComponent.prototype.isDayOnPast = function (d) {
        var a = d;
        var b = new Date();
        var c = this.normalizeDate(a);
        var e = this.normalizeDate(b);
        return c < e;
    };
    DatepickerComponent.prototype.firstDayOfWeek = function (month, year) {
        var d = new Date((month + 1) + '/1/' + year);
        var e = d.getDay();
        e -= 1;
        if (e == -1) {
            e = 6;
        }
        return {
            index: {
                uk: e,
                us: d.getDay()
            },
            labels: {
                long_us: this.longWeekDays[d.getDay()],
                long_uk: this.longWeekDays[e],
                short_us: this.shortWeekDays[d.getDay()],
                short_uk: this.shortWeekDays[e]
            }
        };
    };
    DatepickerComponent.prototype.prevMonth = function () {
        if (this.selectedMonth == 0) {
            this.selectedMonth = 11;
            this.selectedYear--;
        }
        else {
            this.selectedMonth--;
        }
        if ((this.selectedMonth < this.thisMonth && this.selectedYear == this.thisYear) && this.cannotSelectPast) {
            this.selectedMonth = this.thisMonth;
            this.selectedYear = this.thisYear;
        }
        this.pastDays = this.dummyArrayGenerator(this.firstDayOfWeek(this.selectedMonth, this.selectedYear).index.uk);
    };
    DatepickerComponent.prototype.nextMonth = function () {
        if (this.selectedMonth == 11) {
            this.selectedMonth = 0;
            this.selectedYear++;
        }
        else {
            this.selectedMonth++;
        }
        this.pastDays = this.dummyArrayGenerator(this.firstDayOfWeek(this.selectedMonth, this.selectedYear).index.uk);
    };
    DatepickerComponent.prototype.lastDayOfMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    };
    DatepickerComponent.prototype.select = function (d, m, y) {
        if (this.cannotSelectPast) {
            var g = new Date(y, m, d);
            if (this.isDayOnPast(g)) {
                return;
            }
            ;
        }
        if (this.minDay && this.minJsMonth && this.minYear) {
            var a = new Date(y, m, d);
            var b = new Date(this.minYear, this.minJsMonth, this.minDay);
            if (a < b) {
                alert('Please choose a date later than ' + this.minDay + '/' + (this.minJsMonth + 1) + '/' + this.minYear);
                return;
            }
        }
        var x = new Date(y, m, d);
        var dta = {
            day: d,
            month: m,
            year: y,
            fullDate: x,
            longMonth: this.longMonths[m],
            shortMonth: this.shortMonths[m],
            longWeekDay: this.longWeekDays[x.getDay()],
            shortWeekDay: this.shortWeekDays[x.getDay()]
        };
        this.dateSelected.emit(dta);
        this.displayDate = this.pad(d, 2) + '/' + this.pad(m + 1, 2) + '/' + y;
        this.show = false;
    };
    return DatepickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatepickerComponent.prototype, "day", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatepickerComponent.prototype, "jsMonth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatepickerComponent.prototype, "year", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatepickerComponent.prototype, "minDay", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatepickerComponent.prototype, "minJsMonth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], DatepickerComponent.prototype, "minYear", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatepickerComponent.prototype, "cannotSelectPast", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatepickerComponent.prototype, "dateSelected", void 0);
DatepickerComponent = __decorate([
    core_1.Component({
        selector: 'datepicker',
        template: require('./datepicker.html'),
        styles: [require('./datepicker.css')]
    })
], DatepickerComponent);
exports.DatepickerComponent = DatepickerComponent;
//# sourceMappingURL=datepicker.component.js.map