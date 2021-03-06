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
var LbrefineComponent = (function () {
    function LbrefineComponent() {
        this.criteriaChanged = new core_1.EventEmitter();
        this.rangeFrom = 0;
        this.rangeTo = 100;
    }
    LbrefineComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        $("#sliderElement").ionRangeSlider({
            type: "double",
            min: 0,
            max: 100,
            grid: false,
            from: this.rangeFrom,
            to: this.rangeTo,
            decorate_both: false,
            onFinish: function (event) { return _this.broadcastChanges(event); }
        });
    };
    LbrefineComponent.prototype.broadcastChanges = function (par) {
        if (par) {
            this.rangeFrom = par.from;
            this.rangeTo = par.to;
        }
        var s = {
            selectedDate1: this.date1,
            selectedDate2: this.date2,
            selections: {},
            range: {
                from: this.rangeFrom,
                to: this.rangeTo
            }
        };
        this.groups.forEach(function (item1) {
            s.selections[item1.groupId] = [];
            item1.items.forEach(function (item2, index1) {
                if (item2.selected) {
                    s.selections[item1.groupId].push(item2.id);
                }
            });
        });
        this.criteriaChanged.emit(s);
    };
    LbrefineComponent.prototype.clearGroup = function (g) {
        this.groups[g].items.forEach(function (item) {
            item.selected = false;
        });
    };
    LbrefineComponent.prototype.clearAll = function () {
        var _this = this;
        this.groups.forEach(function (item, index) {
            _this.clearGroup(index);
        });
        this.date1 = undefined;
        this.date2 = undefined;
        this.rangeFrom = 0;
        this.rangeTo = 100;
        this.broadcastChanges();
    };
    LbrefineComponent.prototype.handleStartDate = function (e) {
        this.date1 = e.fullDate;
        this.setMinDate(e.fullDate);
        if (this.date2 && new Date(this.date2) < e.fullDate) {
            this.handleEndDate(e);
        }
    };
    LbrefineComponent.prototype.handleEndDate = function (e) {
        this.date2 = e.fullDate;
    };
    LbrefineComponent.prototype.setMinDate = function (date) {
        this.minDay = date.getDate();
        this.minMonth = date.getMonth();
        this.minYear = date.getFullYear();
    };
    return LbrefineComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LbrefineComponent.prototype, "groups", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LbrefineComponent.prototype, "hideDates", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LbrefineComponent.prototype, "hideRange", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], LbrefineComponent.prototype, "criteriaChanged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LbrefineComponent.prototype, "date1", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LbrefineComponent.prototype, "date2", void 0);
LbrefineComponent = __decorate([
    core_1.Component({
        selector: 'lbrefine',
        template: require('./lbrefine.html'),
        styles: [require('./lbrefine.css'), require('./ion.rangeSlider.custom.css')],
        encapsulation: core_1.ViewEncapsulation.None
    })
], LbrefineComponent);
exports.LbrefineComponent = LbrefineComponent;
//# sourceMappingURL=lbrefine.component.js.map