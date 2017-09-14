import { Component, Input, Output, EventEmitter, AfterViewInit, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import Shareservice = require("../../../services/helpers/shareservice");
import { MarketDataService } from "../../../services/marketdataservice";
import { UserDataService } from "../../../services/userdataservice";
import ShareService = Shareservice.ShareService;

declare var Materialize: any;
declare var $: any;

@Component({
    selector: 'userfilter',
    template: require('./userfilter.component.html'),
    styles: [require('./userfilter.component.css')]
})
export class UserFilter implements AfterViewInit, OnChanges, OnDestroy {

    @Input()
    renderTextSearch: boolean = false;
    @Input()
    renderPointRange: boolean = false;
    @Input()
    renderPointDateRange: boolean = false;
    @Input()
    rangeFrom: number = 0;
    @Input()
    rangeTo: number = 100;
    @Input()
    renderUserGroupFilter: boolean = false;
    @Input()
    renderRegionFilter: boolean = false;
    @Input()
    renderZoneFilter: boolean = false;
    @Input()
    renderDealershipFilter: boolean = false;
    @Input()
    refreshFilters: boolean = false;
    @Output()
    criteriaChanged: EventEmitter<UserFilters> = new EventEmitter();
    
    public criteria: UserFilters = new UserFilters();

    constructor(private sharedService: ShareService, public marketDataService: MarketDataService, public userDataService: UserDataService) { 

    }
    
    ngAfterViewInit() {
        if (this.renderPointRange)
            setTimeout(() => {
                this.setupRangeSlider();
            }, 10);
        this.getMarketFilters();
        this.setupSubscriptions();
    }

    ngOnDestroy() {
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        if (changes['refreshFilters']) {
            this.getMarketFilters();
            this.refreshFilters = false;
        }
    }

    setupSubscriptions() {
        this.sharedService.marketUpdated.subscribe((market) => {
            this.nullAllFilters();
            this.getMarketFilters();
        });
    }
    
    broadcastChanges() {
        setTimeout(() => {
            this.criteria.userGroupFilters = this.criteria.allUserGroupFilters.filter(x => x.checked);
            this.criteria.dealershipFilters = this.criteria.allDealershipFilters.filter(x => x.checked);
            this.criteria.regionFilters = this.criteria.allRegionFilters.filter(x => x.checked);
            this.criteria.zoneFilters = this.criteria.allZoneFilters.filter(x => x.checked);
            this.criteriaChanged.emit(this.criteria);
        }, 50);
    }

    getMarketFilters() {
        this.marketDataService.getMarketUserFilters().subscribe((result) => {
            if (result) {
                this.emptyAllFilters();
                if (this.renderDealershipFilter && result.dealershipNames.length > 0) {
                    result.dealershipNames.forEach((group) => {
                        this.criteria.allDealershipFilters.push({ id: group.replace(" ", ""), text: group, checked: false });
                    });
                } else
                    this.renderDealershipFilter = false;
                if (this.renderRegionFilter && result.regions.length > 0) {
                    result.regions.forEach((group) => {
                        this.criteria.allRegionFilters.push({ id: group.replace(" ", ""), text: group, checked: false });
                    });
                } else
                    this.renderRegionFilter = false;
                if (this.renderZoneFilter && result.zones.length > 0) {
                    result.zones.forEach((group) => {
                        this.criteria.allZoneFilters.push({ id: group.replace(" ", ""), text: group, checked: false });
                    });
                } else
                    this.renderZoneFilter = false;
            } else {
                this.renderRegionFilter = false;
                this.renderDealershipFilter = false;
                this.renderZoneFilter = false;
            }
        });
        if (this.renderUserGroupFilter) {
            this.userDataService.getUserGroups().subscribe((result) => {
                this.criteria.allUserGroupFilters = [];
                if (result && result.userGroupNames && result.userGroupNames.length > 0) {
                    result.userGroupNames.forEach((group) => {
                        this.criteria.allUserGroupFilters.push({ id: group.id, text: group.name, checked: false });
                    });

                } else {
                    this.renderUserGroupFilter = false;
                }
            });
        } 

    }

    nullAllFilters() {
        this.criteria.allUserGroupFilters = null;
        this.criteria.allDealershipFilters = null;
        this.criteria.allRegionFilters = null;
        this.criteria.allZoneFilters = null;
    }

    emptyAllFilters() {
        this.criteria.allUserGroupFilters = [];
        this.criteria.allDealershipFilters = [];
        this.criteria.allRegionFilters = [];
        this.criteria.allZoneFilters = [];
    }

    public clearFilters() {
        this.criteria.allUserGroupFilters.forEach(x => x.checked = false);
        this.criteria.allDealershipFilters.forEach(x => x.checked = false);
        this.criteria.allRegionFilters.forEach(x => x.checked = false);
        this.criteria.allZoneFilters.forEach(x => x.checked = false);
        this.criteria.searchString = "";
        if (this.renderPointRange)
            this.resetRange();
    }

    public clearUserFilters() {
        this.criteria.allUserGroupFilters.forEach(x => x.checked = false);
    }

    public clearDealerFilters() {
        this.criteria.allDealershipFilters.forEach(x => x.checked = false);
    }

    public clearZoneFilters() {
        this.criteria.allZoneFilters.forEach(x => x.checked = false);
    }

    public clearRegionFilters() {
        this.criteria.allRegionFilters.forEach(x => x.checked = false);
    }
        
    public setupRangeSlider() {
        $("#sliderElement").ionRangeSlider({
            type: "double",
            min: this.rangeFrom,
            max: this.rangeTo,
            grid: false,
            from: this.criteria.pointsRangeBottom,
            to: this.criteria.pointsRangeTop,
            decorate_both: false,
            onFinish: event => this.onSliderChange(event)
        });
    }

    public resetRange() {
        this.criteria.pointsRangeBottom = 0;
        this.criteria.pointsRangeTop = 100;
        var slider = $("#sliderElement").data("ionRangeSlider");
        slider.reset();
    }

    public onSliderChange(event) {
        if (this.criteria.pointsRangeBottom === event.from && this.criteria.pointsRangeTop === event.to)
            return;

        this.criteria.pointsRangeBottom = event.from;
        this.criteria.pointsRangeTop = event.to;
        this.broadcastChanges();
    }
}

export class UserFilters {
    public allUserGroupFilters: { id: string, text: string, checked: boolean }[];
    public allDealershipFilters: { id: string, text: string, checked: boolean }[];
    public allZoneFilters: { id: string, text: string, checked: boolean }[];
    public allRegionFilters: { id: string, text: string, checked: boolean }[];
    public userGroupFilters: { id: string, text: string, checked: boolean }[] = [];
    public dealershipFilters: { id: string, text: string, checked: boolean }[] = [];
    public zoneFilters: { id: string, text: string, checked: boolean }[] = [];
    public regionFilters: { id: string, text: string, checked: boolean }[] = [];
    public pointsRangeBottom: number = 0;
    public pointsRangeTop: number = 100;
    public pointsFromDate: string;
    public pointsToDate: string;
    public searchString: string = "";
}