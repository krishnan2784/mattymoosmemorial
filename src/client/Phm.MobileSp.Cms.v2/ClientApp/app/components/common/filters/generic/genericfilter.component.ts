import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import {ShareService} from "../../../../shared/services/helpers/shareservice";

declare var $: any;

@Component({
	selector: 'genericfilter',
	template: require('./genericfilter.component.html'),
	styles: [require('./genericfilter.component.css')]
})
export class GenericFilterComponent implements AfterViewInit {

    @Input()
    public filterSet: GenericFilterSet;
	public outputFilterSet: GenericFilter[];

    @Output()
	criteriaChanged: EventEmitter<GenericFilter[]> = new EventEmitter();

	filterTypes: typeof FilterType = FilterType;

    constructor(private sharedService: ShareService) { 

    }
    
    ngAfterViewInit() {
        setTimeout(() => {
			this.setupRangeSliders();
        }, 10);
    }
	
    broadcastChanges() {
		setTimeout(() => {
			this.outputFilterSet = [];
			this.filterSet.filterGroups.forEach(x => {
				x.filters.forEach(y => {
					var f = this.getFilterValue(y);
					if (f)
						this.outputFilterSet.push(f);
				});
			});
			this.criteriaChanged.emit(this.outputFilterSet);
			console.log(this.outputFilterSet);
		}, 50);
    }

	getFilterValue(filter: GenericFilter): GenericFilter {
		switch (filter.filterType) {
			case FilterType.Text:
				var sr = filter as StringFilter;
				if (sr && sr.value !== '')
					return sr;
				break;

			case FilterType.Checkbox:
				var cr = filter as CheckboxFilter;
				if (cr && cr.values) {
					cr.values = cr.values.filter(x => x.checked);
					if (cr.values.length > 0)
						return cr;
				}
				break;
			case FilterType.DateRange:
				var dr = filter as DateRangeFilter;
				if (dr && (dr.date1 !== dr.initialDate1 || dr.date2 !== dr.initialDate2))
					return dr;
				break;

			case FilterType.Range:
				var rr = filter as RangeFilter;
				if (rr && (rr.bottomValue !== rr.minValue || rr.topValue !== rr.maxValue))
					return rr;
				break;
		}
		return null;
	}

	clearFilters() {
		this.outputFilterSet = [];
		this.filterSet.filterGroups.forEach((x, i) => {
			this.clearFilterGroup(i);
		});
	}

	clearFilterGroup(groupIndex) {
		this.filterSet.filterGroups[groupIndex].filters.forEach((x, i) => {
			this.clearFilter(groupIndex, i, x);
		});
	}

	clearFilter(groupIndex, filterIndex, filter: GenericFilter) {
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
	}

	clearStringFilter(groupIndex, filterIndex) {
		var f = this.getFilter(groupIndex, filterIndex) as StringFilter;
		f.value = '';
		this.updateFilter(f, groupIndex, filterIndex);
	}

	clearCheckboxFilters(groupIndex, filterIndex) {
		var f = this.getFilter(groupIndex, filterIndex) as CheckboxFilter;
		f.values.forEach(x => x.checked = false);
		this.updateFilter(f, groupIndex, filterIndex);
	}
	
	clearDateFilter(groupIndex, filterIndex) {
		var f = this.getFilter(groupIndex, filterIndex) as DateRangeFilter;
		f.date1 = f.initialDate1;
		f.date2 = f.initialDate2;
		f = this.setMinDate(f, f.initialDate1 === null ? null : new Date(f.initialDate1));
		this.updateFilter(f, groupIndex, filterIndex);
	}

	clearRangerFilter(groupIndex, filterIndex) {
		var f = this.getFilter(groupIndex, filterIndex) as RangeFilter;
		f.bottomValue = f.minValue;
		f.topValue = f.maxValue;
		this.updateFilter(f, groupIndex, filterIndex);
		this.resetRange(groupIndex, filterIndex);
	}

	getFilter(groupIndex, filterIndex): GenericFilter {
		return this.filterSet.filterGroups[groupIndex].filters[filterIndex];
	}

	updateFilter(filter, groupIndex, filterIndex) {
		this.filterSet.filterGroups[groupIndex].filters.splice(filterIndex, 1, filter);
	}

	handleStartDate(groupIndex, filterIndex, e) {
		var f = this.getFilter(groupIndex, filterIndex) as DateRangeFilter;
		f.date1 = e.fullDate;
		this.setMinDate(f, e.fullDate);
		this.updateFilter(f, groupIndex, filterIndex);

		if (f.date2 && new Date(f.date2) < e.fullDate) {
			this.handleEndDate(groupIndex, filterIndex, e);
		} 
	}

	setMinDate(f: DateRangeFilter, date): DateRangeFilter {
		if (!date) {
			f.minDay = null;
			f.minMonth = null;
			f.minYear = null;
		} else {
			f.minDay = date.getDate();
			f.minMonth = date.getMonth();
			f.minYear = date.getFullYear();
		}
		return f;
	}

	handleEndDate(groupIndex, filterIndex, e) {
		var f = this.getFilter(groupIndex, filterIndex) as DateRangeFilter;
		f.date2 = e.fullDate;
		this.updateFilter(f, groupIndex, filterIndex);
	}

	public setupRangeSliders() {
		this.filterSet.filterGroups.forEach((x, i) => {
			x.filters.forEach((y, ii) => {
				if (y.filterType === FilterType.Range)
					this.setupRangeSlider(i, ii);
			});
		});
	}

	public setupRangeSlider(groupIndex, filterIndex) {
		var filter = this.filterSet.filterGroups[groupIndex].filters[filterIndex] as RangeFilter;
		$("#range_" + groupIndex + '_' + filterIndex).ionRangeSlider({
            type: "double",
			min: filter.minValue,
			max: filter.maxValue,
            grid: false,
			from: filter.minValue,
			to: filter.maxValue,
            decorate_both: false,
			onFinish: event => this.onSliderChange(event, groupIndex, filterIndex)
        });
    }

	public resetRange(groupIndex, filterIndex) {
		var slider = $("#range_" + groupIndex + '_' + filterIndex).data("ionRangeSlider");
        slider.reset();
    }

	public onSliderChange(event, groupIndex, filterIndex) {
		var filter = this.filterSet.filterGroups[groupIndex].filters[filterIndex] as RangeFilter;
		if (filter.bottomValue === event.from && filter.topValue === event.to)
            return;
		filter.bottomValue = event.from;
		filter.topValue = event.to;
		this.filterSet.filterGroups[groupIndex].filters.splice(filterIndex, 1, filter);
        this.broadcastChanges();
    }
}

export class GenericFilterSet {
	public filterSetId: string;
	public filterGroups: GenericFilterGroup[];
	constructor(filterSetId: string, filterGroups: GenericFilterGroup[]) {
		this.filterSetId = filterSetId;
		this.filterGroups = filterGroups;
	}
}

export class GenericFilterGroup {
	public renderClear: boolean;
	public groupName: string;
	public filters: GenericFilter[];
	constructor(renderClear: boolean, filters: GenericFilter[], groupName: string = 'REFINE BY:') {
		this.renderClear = renderClear;
		this.filters = filters;
		this.groupName = groupName;
	}
}

export class GenericFilter {
	public filterName: string;
	public filterColumm: string;
	public filterType: FilterType;
	constructor(filterName: string, filterType: FilterType, filterColumm : string ='') {
		this.filterName = filterName;
		this.filterType = filterType;
		this.filterColumm = filterColumm;
	}
}

export class StringFilter extends GenericFilter {
	public value: string = '';
	constructor(filterName: string) {
		super(filterName, FilterType.Text);
	}
}

export class CheckboxFilter extends GenericFilter {
	public values: FilterCheckbox[];
	constructor(filterName: string, values: FilterCheckbox[]=[]) {
		super(filterName, FilterType.Checkbox);
		this.values = values;
	}
}

export class FilterCheckbox {
	public name: string;
	public checked: boolean;
	constructor(name: string, checked: boolean = false) {
		this.name = name;
		this.checked = checked;
	}
}

export class DateRangeFilter extends GenericFilter {
	public initialDate1;
	public initialDate2;
	public date1: string = '';
	public date2: string = '';
	minDay;
	minMonth;
	minYear;
	constructor(filterName: string, initialDate1: string = null, initialDate2: string = null,
		minDay = null, minMonth = null, minYear = null) {
		super(filterName, FilterType.DateRange);
		this.initialDate1 = initialDate1;
		this.date1 = initialDate1;
		this.initialDate2 = initialDate2;
		this.date2 = initialDate2;
		this.minDay = minDay;
		this.minMonth = minMonth;
		this.minYear = minYear;
	}
}

export class RangeFilter extends GenericFilter {
	public minValue: number;
	public maxValue: number;
	public bottomValue: number = 0;
	public topValue: number = 0;
	constructor(filterName: string, minValue: number = 0, maxValue: number =100) {
		super(filterName, FilterType.Range);
		this.minValue = minValue;
		this.maxValue = maxValue;
		this.bottomValue = minValue;
		this.topValue = maxValue;
	}
}

export enum FilterType {
	Text = 0,
	Checkbox = 1,
	DateRange = 2,
	Range = 3
} 

export class DefaultFilterSets {
	public static competitionFilters: GenericFilterSet = new GenericFilterSet('competitionFilterSet', [
		new GenericFilterGroup(false, [
			new StringFilter('search')
		], ''),
		new GenericFilterGroup(true, [
			new DateRangeFilter('Date'),
			new RangeFilter('Number of Participants', 0, 100)
		])
	]);
}
