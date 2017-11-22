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
var forms_1 = require("@angular/forms");
var DateRangeComponent = (function () {
    function DateRangeComponent() {
        this.date1Label = '';
        this.date2Label = '';
    }
    DateRangeComponent.prototype.ngOnInit = function () {
        if (!this.form.controls[this.date1FormControlId].value || this.form.controls[this.date1FormControlId].value == '') {
            var now = new Date();
            this.handleStartDate(now);
            now.setDate(now.getDate() + 14);
            this.handleEndDate(now);
        }
    };
    DateRangeComponent.prototype.handleStartDate = function (e) {
        this.minDay = e.day;
        this.minMonth = e.month;
        this.minYear = e.year;
        this.form.controls[this.date1FormControlId].setValue(e.fullDate);
        if (new Date(this.form.controls[this.date2FormControlId].value) < e.fullDate) {
            this.handleEndDate(e);
        }
        this.form.markAsDirty();
    };
    DateRangeComponent.prototype.handleEndDate = function (e) {
        this.form.controls[this.date2FormControlId].setValue(e.fullDate);
        this.form.markAsDirty();
    };
    DateRangeComponent.prototype.setMinDate = function (date) {
        var now = new Date();
        if (new Date(date) < now)
            date = now;
        this.minDay = date.getDate();
        this.minMonth = date.getMonth();
        this.minYear = date.getFullYear();
    };
    return DateRangeComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], DateRangeComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateRangeComponent.prototype, "date1FormControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateRangeComponent.prototype, "date1Label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateRangeComponent.prototype, "date1ElementId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateRangeComponent.prototype, "date2FormControlId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateRangeComponent.prototype, "date2Label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DateRangeComponent.prototype, "date2ElementId", void 0);
DateRangeComponent = __decorate([
    core_1.Component({
        selector: 'date-range',
        styles: [""],
        template: "\n<div [formGroup]=\"form\" *ngIf=\"form\">\n    <input type=\"hidden\" formControlName=\"{{date1FormControlId}}\">\n    <input type=\"hidden\" formControlName=\"{{date2FormControlId}}\">\n\t\t<div class=\"col-md-6\">\n\t        <label>{{date1Label}}</label>\n\t        <datepicker (dateSelected)=\"handleStartDate($event);\" [initialDate]=\"form.controls[this.date1FormControlId].value\" \n\t\t\t[cannotSelectPast]=\"true\" [minDay]=\"1\" [minJsMonth]=\"2\" [minYear]=\"2017\" [elementId]=\"date1ElementId\"></datepicker>\n        </div>\n\n\t\t<div class=\"col-md-6\">\n\t        <label>{{date2Label}}</label>\n\t        <datepicker (dateSelected)=\"handleEndDate($event);\" [initialDate]=\"form.controls[this.date2FormControlId].value\" \n\t\t\t[cannotSelectPast]=\"true\" [minDay]=\"minDay\" [minJsMonth]=\"minMonth\" [minYear]=\"minYear\" [elementId]=\"date2ElementId\"></datepicker>\n        </div>\n<div class=\"clearfix\"></div>\n</div>\n"
    })
], DateRangeComponent);
exports.DateRangeComponent = DateRangeComponent;
//# sourceMappingURL=daterange.component.js.map