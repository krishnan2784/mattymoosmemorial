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
var shareservice_1 = require("../../../../services/helpers/shareservice");
var GenericFilterComponent = (function () {
    function GenericFilterComponent(sharedService) {
        this.sharedService = sharedService;
        this.criteriaChanged = new core_1.EventEmitter();
        this.filterTypes = FilterType;
    }
    GenericFilterComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.setupRangeSliders();
        }, 10);
    };
    GenericFilterComponent.prototype.broadcastChanges = function () {
        var _this = this;
        setTimeout(function () {
            _this.outputFilterSet = [];
            _this.filterSet.filterGroups.forEach(function (x) {
                x.filters.forEach(function (y) {
                    var f = _this.getFilterValue(y);
                    if (f)
                        _this.outputFilterSet.push(f);
                });
            });
            _this.criteriaChanged.emit(_this.outputFilterSet);
            console.log(_this.outputFilterSet);
        }, 50);
    };
    GenericFilterComponent.prototype.getFilterValue = function (filter) {
        switch (filter.filterType) {
            case FilterType.Text:
                var sr = filter;
                if (sr && sr.value !== '')
                    return sr;
                break;
            case FilterType.Checkbox:
                var cr = filter;
                if (cr && cr.values) {
                    cr.values = cr.values.filter(function (x) { return x.checked; });
                    if (cr.values.length > 0)
                        return cr;
                }
                break;
            case FilterType.DateRange:
                var dr = filter;
                if (dr && (dr.date1 !== dr.initialDate1 || dr.date2 !== dr.initialDate2))
                    return dr;
                break;
            case FilterType.Range:
                var rr = filter;
                if (rr && (rr.bottomValue !== rr.minValue || rr.topValue !== rr.maxValue))
                    return rr;
                break;
        }
        return null;
    };
    GenericFilterComponent.prototype.clearFilters = function () {
        var _this = this;
        this.outputFilterSet = [];
        this.filterSet.filterGroups.forEach(function (x, i) {
            _this.clearFilterGroup(i);
        });
    };
    GenericFilterComponent.prototype.clearFilterGroup = function (groupIndex) {
        var _this = this;
        this.filterSet.filterGroups[groupIndex].filters.forEach(function (x, i) {
            _this.clearFilter(groupIndex, i, x);
        });
    };
    GenericFilterComponent.prototype.clearFilter = function (groupIndex, filterIndex, filter) {
        switch (filter.filterType) {
            case FilterType.Text:
                this.clearStringFilter(groupIndex, filterIndex);
                break;
            case FilterType.Checkbox:
                this.clearCheckboxFilters(groupIndex, filterIndex);
                break;
            case FilterType.DateRange:
                this.clearDateFilter(groupIndex, filterIndex);
                break;
            case FilterType.Range:
                this.clearRangerFilter(groupIndex, filterIndex);
                break;
        }
    };
    GenericFilterComponent.prototype.clearStringFilter = function (groupIndex, filterIndex) {
        var f = this.getFilter(groupIndex, filterIndex);
        f.value = '';
        this.updateFilter(f, groupIndex, filterIndex);
    };
    GenericFilterComponent.prototype.clearCheckboxFilters = function (groupIndex, filterIndex) {
        var f = this.getFilter(groupIndex, filterIndex);
        f.values.forEach(function (x) { return x.checked = false; });
        this.updateFilter(f, groupIndex, filterIndex);
    };
    GenericFilterComponent.prototype.clearDateFilter = function (groupIndex, filterIndex) {
        var f = this.getFilter(groupIndex, filterIndex);
        f.date1 = f.initialDate1;
        f.date2 = f.initialDate2;
        f = this.setMinDate(f, f.initialDate1 === null ? null : new Date(f.initialDate1));
        this.updateFilter(f, groupIndex, filterIndex);
    };
    GenericFilterComponent.prototype.clearRangerFilter = function (groupIndex, filterIndex) {
        var f = this.getFilter(groupIndex, filterIndex);
        f.bottomValue = f.minValue;
        f.topValue = f.maxValue;
        this.updateFilter(f, groupIndex, filterIndex);
        this.resetRange(groupIndex, filterIndex);
    };
    GenericFilterComponent.prototype.getFilter = function (groupIndex, filterIndex) {
        return this.filterSet.filterGroups[groupIndex].filters[filterIndex];
    };
    GenericFilterComponent.prototype.updateFilter = function (filter, groupIndex, filterIndex) {
        this.filterSet.filterGroups[groupIndex].filters.splice(filterIndex, 1, filter);
    };
    GenericFilterComponent.prototype.handleStartDate = function (groupIndex, filterIndex, e) {
        var f = this.getFilter(groupIndex, filterIndex);
        f.date1 = e.fullDate;
        this.setMinDate(f, e.fullDate);
        this.updateFilter(f, groupIndex, filterIndex);
        if (f.date2 && new Date(f.date2) < e.fullDate) {
            this.handleEndDate(groupIndex, filterIndex, e);
        }
    };
    GenericFilterComponent.prototype.setMinDate = function (f, date) {
        if (!date) {
            f.minDay = null;
            f.minMonth = null;
            f.minYear = null;
        }
        else {
            f.minDay = date.getDate();
            f.minMonth = date.getMonth();
            f.minYear = date.getFullYear();
        }
        return f;
    };
    GenericFilterComponent.prototype.handleEndDate = function (groupIndex, filterIndex, e) {
        var f = this.getFilter(groupIndex, filterIndex);
        f.date2 = e.fullDate;
        this.updateFilter(f, groupIndex, filterIndex);
    };
    GenericFilterComponent.prototype.setupRangeSliders = function () {
        var _this = this;
        this.filterSet.filterGroups.forEach(function (x, i) {
            x.filters.forEach(function (y, ii) {
                if (y.filterType === FilterType.Range)
                    _this.setupRangeSlider(i, ii);
            });
        });
    };
    GenericFilterComponent.prototype.setupRangeSlider = function (groupIndex, filterIndex) {
        var _this = this;
        var filter = this.filterSet.filterGroups[groupIndex].filters[filterIndex];
        $("#range_" + groupIndex + '_' + filterIndex).ionRangeSlider({
            type: "double",
            min: filter.minValue,
            max: filter.maxValue,
            grid: false,
            from: filter.minValue,
            to: filter.maxValue,
            decorate_both: false,
            onFinish: function (event) { return _this.onSliderChange(event, groupIndex, filterIndex); }
        });
    };
    GenericFilterComponent.prototype.resetRange = function (groupIndex, filterIndex) {
        var slider = $("#range_" + groupIndex + '_' + filterIndex).data("ionRangeSlider");
        slider.reset();
    };
    GenericFilterComponent.prototype.onSliderChange = function (event, groupIndex, filterIndex) {
        var filter = this.filterSet.filterGroups[groupIndex].filters[filterIndex];
        if (filter.bottomValue === event.from && filter.topValue === event.to)
            return;
        filter.bottomValue = event.from;
        filter.topValue = event.to;
        this.filterSet.filterGroups[groupIndex].filters.splice(filterIndex, 1, filter);
        this.broadcastChanges();
    };
    return GenericFilterComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", GenericFilterSet)
], GenericFilterComponent.prototype, "filterSet", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], GenericFilterComponent.prototype, "criteriaChanged", void 0);
GenericFilterComponent = __decorate([
    core_1.Component({
        selector: 'genericfilter',
        template: require('./genericfilter.component.html'),
        styles: [require('./genericfilter.component.css')]
    }),
    __metadata("design:paramtypes", [shareservice_1.ShareService])
], GenericFilterComponent);
exports.GenericFilterComponent = GenericFilterComponent;
var GenericFilterSet = (function () {
    function GenericFilterSet(filterSetId, filterGroups) {
        this.filterSetId = filterSetId;
        this.filterGroups = filterGroups;
    }
    return GenericFilterSet;
}());
exports.GenericFilterSet = GenericFilterSet;
var GenericFilterGroup = (function () {
    function GenericFilterGroup(renderClear, filters, groupName) {
        if (groupName === void 0) { groupName = 'REFINE BY:'; }
        this.renderClear = renderClear;
        this.filters = filters;
        this.groupName = groupName;
    }
    return GenericFilterGroup;
}());
exports.GenericFilterGroup = GenericFilterGroup;
var GenericFilter = (function () {
    function GenericFilter(filterName, filterType, filterColumm) {
        if (filterColumm === void 0) { filterColumm = ''; }
        this.filterName = filterName;
        this.filterType = filterType;
        this.filterColumm = filterColumm;
    }
    return GenericFilter;
}());
exports.GenericFilter = GenericFilter;
var StringFilter = (function (_super) {
    __extends(StringFilter, _super);
    function StringFilter(filterName) {
        var _this = _super.call(this, filterName, FilterType.Text) || this;
        _this.value = '';
        return _this;
    }
    return StringFilter;
}(GenericFilter));
exports.StringFilter = StringFilter;
var CheckboxFilter = (function (_super) {
    __extends(CheckboxFilter, _super);
    function CheckboxFilter(filterName, values) {
        if (values === void 0) { values = []; }
        var _this = _super.call(this, filterName, FilterType.Checkbox) || this;
        _this.values = values;
        return _this;
    }
    return CheckboxFilter;
}(GenericFilter));
exports.CheckboxFilter = CheckboxFilter;
var FilterCheckbox = (function () {
    function FilterCheckbox(name, checked) {
        if (checked === void 0) { checked = false; }
        this.name = name;
        this.checked = checked;
    }
    return FilterCheckbox;
}());
exports.FilterCheckbox = FilterCheckbox;
var DateRangeFilter = (function (_super) {
    __extends(DateRangeFilter, _super);
    function DateRangeFilter(filterName, initialDate1, initialDate2, minDay, minMonth, minYear) {
        if (initialDate1 === void 0) { initialDate1 = null; }
        if (initialDate2 === void 0) { initialDate2 = null; }
        if (minDay === void 0) { minDay = null; }
        if (minMonth === void 0) { minMonth = null; }
        if (minYear === void 0) { minYear = null; }
        var _this = _super.call(this, filterName, FilterType.DateRange) || this;
        _this.date1 = '';
        _this.date2 = '';
        _this.initialDate1 = initialDate1;
        _this.date1 = initialDate1;
        _this.initialDate2 = initialDate2;
        _this.date2 = initialDate2;
        _this.minDay = minDay;
        _this.minMonth = minMonth;
        _this.minYear = minYear;
        return _this;
    }
    return DateRangeFilter;
}(GenericFilter));
exports.DateRangeFilter = DateRangeFilter;
var RangeFilter = (function (_super) {
    __extends(RangeFilter, _super);
    function RangeFilter(filterName, minValue, maxValue) {
        if (minValue === void 0) { minValue = 0; }
        if (maxValue === void 0) { maxValue = 100; }
        var _this = _super.call(this, filterName, FilterType.Range) || this;
        _this.bottomValue = 0;
        _this.topValue = 0;
        _this.minValue = minValue;
        _this.maxValue = maxValue;
        _this.bottomValue = minValue;
        _this.topValue = maxValue;
        return _this;
    }
    return RangeFilter;
}(GenericFilter));
exports.RangeFilter = RangeFilter;
var FilterType;
(function (FilterType) {
    FilterType[FilterType["Text"] = 0] = "Text";
    FilterType[FilterType["Checkbox"] = 1] = "Checkbox";
    FilterType[FilterType["DateRange"] = 2] = "DateRange";
    FilterType[FilterType["Range"] = 3] = "Range";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
var DefaultFilterSets = (function () {
    function DefaultFilterSets() {
    }
    return DefaultFilterSets;
}());
DefaultFilterSets.competitionFilters = new GenericFilterSet('competitionFilterSet', [
    new GenericFilterGroup(false, [
        new StringFilter('search')
    ], ''),
    new GenericFilterGroup(true, [
        new DateRangeFilter('Date'),
        new RangeFilter('Number of Participants', 0, 100)
    ])
]);
exports.DefaultFilterSets = DefaultFilterSets;
//# sourceMappingURL=genericfilter.component.js.map