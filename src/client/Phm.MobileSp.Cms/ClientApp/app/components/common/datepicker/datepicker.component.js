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
var date_1 = require("../../../classes/helpers/date");
var DatepickerComponent = (function () {
    function DatepickerComponent(_eref) {
        this._eref = _eref;
        this.rightAlign = false;
        this.dateSelected = new core_1.EventEmitter();
        this.show = false;
        this.hidePastDays = false;
        this.today = new Date();
        this.displayDate = 'dd/mm/yyyy';
        this.thisDay = this.today.getDate();
        this.thisMonth = this.today.getMonth();
        this.thisYear = this.today.getFullYear();
        this.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.shortWeekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.longMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        this.longWeekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Friday', 'Saturday'];
        this.toggle = this.toggleDisplay.bind(this);
    }
    DatepickerComponent.prototype.ngOnInit = function () {
        if (this.initialDate) {
            this.selectedDate = new Date(this.initialDate);
            this.updateDisplayDate();
        }
        else
            this.selectedDate = new Date();
        if (!this.day || !this.jsMonth || !this.year) {
            this.selectedDay = this.selectedDate.getDate();
            this.selectedMonth = this.selectedDate.getMonth();
            this.selectedYear = this.selectedDate.getFullYear();
        }
        if (!this.selectedMonth || !this.selectedYear) {
            var d = new Date();
            this.selectedMonth = d.getMonth();
            this.selectedYear = d.getFullYear();
        }
        this.pastDays = this.dummyArrayGenerator(this.firstDayOfWeek(this.selectedMonth, this.selectedYear).index.uk);
    };
    DatepickerComponent.prototype.ngOnChanges = function (changes) {
        var log = [];
        if (changes['initialDate']) {
            var initDate = changes['initialDate'];
            if (!initDate.isFirstChange()) {
                if (this.initialDate) {
                    this.selectedDate = new Date(this.initialDate);
                    this.updateDisplayDate();
                }
                else {
                    this.reset();
                }
                this.selectedDay = this.selectedDate.getDate();
                this.selectedMonth = this.selectedDate.getMonth();
                this.selectedYear = this.selectedDate.getFullYear();
            }
        }
    };
    DatepickerComponent.prototype.ngOnDestroy = function () {
        document.removeEventListener('click', this.toggle);
    };
    DatepickerComponent.prototype.toggleDisplay = function (event) {
        if (event === void 0) { event = null; }
        if (event) {
            if (!this._eref.nativeElement.contains(event.target)) {
                this.show = false;
            }
        }
        else
            this.show = !this.show;
        if (this.show) {
            document.addEventListener('click', this.toggle);
        }
        else {
            this.selectedMonth = this.selectedDate.getMonth();
            this.selectedYear = this.selectedDate.getFullYear();
            document.removeEventListener('click', this.toggle);
        }
    };
    DatepickerComponent.prototype.reset = function () {
        this.selectedDate = new Date();
        this.displayDate = 'dd/mm/yyyy';
        this.clearMinDate();
    };
    DatepickerComponent.prototype.clearMinDate = function () {
        this.minDay = null;
        this.minJsMonth = null;
        this.minYear = null;
        this.selectedDay = null;
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
    DatepickerComponent.prototype.checkPastDay = function (d, m, y) {
        if (m === void 0) { m = this.selectedMonth; }
        if (y === void 0) { y = this.selectedYear; }
        if (!this.cannotSelectPast)
            return false;
        var g = new Date(y, m, d);
        var x = this.isDayOnPast(g);
        return x;
    };
    DatepickerComponent.prototype.isDayAboveMin = function (d, m, y) {
        if (y === void 0) { y = this.selectedYear; }
        if (!this.minYear && !this.minJsMonth && !this.minDay)
            return true;
        if (m == -1) {
            m = 11;
            y--;
        }
        var a = new Date(y, m, d);
        var b = new Date(this.minYear, this.minJsMonth, this.minDay);
        return a >= b;
    };
    DatepickerComponent.prototype.isSelectedDay = function (d) {
        if (!this.selectedDate || !this.selectedDay || this.selectedDay != d)
            return false;
        return this.selectedMonth == this.selectedDate.getMonth() && this.selectedYear == this.selectedDate.getFullYear();
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
        if (!this.canGoBack()) {
            return;
        }
        var m = this.selectedMonth;
        var y = this.selectedYear;
        if (m == 0) {
            m = 11;
            y--;
        }
        else {
            m--;
        }
        this.selectedMonth = m;
        this.selectedYear = y;
        this.pastDays = this.dummyArrayGenerator(this.firstDayOfWeek(this.selectedMonth, this.selectedYear).index.uk);
    };
    DatepickerComponent.prototype.canGoBack = function () {
        var m = this.selectedMonth;
        var y = this.selectedYear;
        if (m == 0) {
            m = 11;
            y--;
        }
        else {
            m--;
        }
        if ((this.checkPastDay(this.minDay) && this.selectedDate > new Date(this.selectedYear, this.selectedMonth, 1)) || !this.isDayAboveMin(this.minDay, m, y)) {
            return false;
        }
        return true;
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
        if (!this.isDayAboveMin(d, m, y))
            return;
        var x = new Date(y, m, d);
        var dta = {
            day: d,
            month: m,
            year: y,
            fullDate: x,
            serverAcceptedDate: date_1.DateEx.formatDate(x, 'yyyy-MM-dd'),
            longMonth: this.longMonths[m],
            shortMonth: this.shortMonths[m],
            longWeekDay: this.longWeekDays[x.getDay()],
            shortWeekDay: this.shortWeekDays[x.getDay()]
        };
        this.dateSelected.emit(dta);
        this.selectedDay = d;
        this.selectedDate = x;
        this.updateDisplayDate();
        this.toggleDisplay();
    };
    DatepickerComponent.prototype.updateDisplayDate = function () {
        if (this.selectedDate)
            this.displayDate = date_1.DateEx.formatDate(this.selectedDate, 'dd/MM/yyyy');
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
    core_1.Input(),
    __metadata("design:type", Date)
], DatepickerComponent.prototype, "initialDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatepickerComponent.prototype, "rightAlign", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatepickerComponent.prototype, "elementId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], DatepickerComponent.prototype, "dateSelected", void 0);
DatepickerComponent = __decorate([
    core_1.Component({
        selector: 'datepicker',
        template: require('./datepicker.html'),
        styles: [require('./datepicker.css')]
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DatepickerComponent);
exports.DatepickerComponent = DatepickerComponent;
//# sourceMappingURL=datepicker.component.js.map