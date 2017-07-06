import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter, Injector, AfterViewInit, OnDestroy } from '@angular/core';
import Shareservice = require("../../../services/helpers/shareservice");
import ShareService = Shareservice.ShareService;
import Feeddataservice = require("../../../services/feeddataservice");
import FeedDataService = Feeddataservice.FeedDataService;
import Userdataservice = require("../../../services/userdataservice");
import UserDataService = Userdataservice.UserDataService;

declare var Materialize: any;
declare var noUiSlider: any;

@Component({
    selector: 'userfilter',
    template: require('./userfilter.component.html'),
    styles: [require('./userfilter.component.css')]
})
export class UserFilter implements AfterViewInit, OnDestroy {

    @Input()
    renderTextSearch: boolean = false;
    @Input()
    renderPointRange: boolean = false;
    @Input()
    renderPointDateRange: boolean = false;
    @Input()
    renderUserGroupFilter: boolean = false;
    @Input()
    renderRegionFilter: boolean = false;
    @Input()
    renderZoneFilter: boolean = false;
    @Input()
    renderDealershipFilter: boolean = false;

    @Output()
    criteriaChanged: EventEmitter<UserFilters> = new EventEmitter();
    
    public criteria: UserFilters = new UserFilters();
    public slideChangeBusy = false;

    constructor(private sharedService: ShareService, public feedDataService: FeedDataService, public userDataService: UserDataService) { 
        this.getMarketFilters();
    }
    
    ngAfterViewInit() {
        if (this.renderPointRange)
            this.setupRangeSlider();
    }

    ngOnDestroy() {
        var slider: any = document.getElementById('scoreRange');
        if (slider) {
            slider.noUiSlider.off('end');
        }
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
        this.feedDataService.getQuizSummaryFilters().subscribe((result) => {
            if (result) {
                if (this.renderUserGroupFilter && result.userGroupNames) {
                    this.criteria.allUserGroupFilters = [];
                    result.userGroupNames.forEach((group) => {
                        this.criteria.allUserGroupFilters.push({ id: group.replace(" ", ""), text: group, checked: false });
                    });
                }
                if (this.renderDealershipFilter && result.dealershipNames) {
                    this.criteria.allDealershipFilters = [];
                    result.dealershipNames.forEach((group) => {
                        this.criteria.allDealershipFilters.push({ id: group.replace(" ", ""), text: group, checked: false });
                    });
                }
                this.criteria.allZoneFilters = [];
                this.criteria.allRegionFilters = [];

                this.criteria.allRegionFilters.push({ id: 'Region 1', text: 'Region 1', checked: false });
                this.criteria.allRegionFilters.push({ id: 'Region 2', text: 'Region 2', checked: false });
                this.criteria.allRegionFilters.push({ id: 'Region 3', text: 'Region 3', checked: false });
                this.criteria.allZoneFilters.push({ id: 'Zone 1', text: 'Zone 1', checked: false });
                this.criteria.allZoneFilters.push({ id: 'Zone 2', text: 'Zone 2', checked: false });
                this.criteria.allZoneFilters.push({ id: 'Zone 3', text: 'Zone 3', checked: false });
            }
        });
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

    public resetRange() {
        var slider: any = document.getElementById('scoreRange');
        slider.noUiSlider.reset();
        this.onSliderChange();
    }

    public enableSlider() {
        this.setSliderEvent();
        this.slideChangeBusy = false;
    }
    
    public setupRangeSlider() {
        var slider: any = document.getElementById('scoreRange');

        noUiSlider.create(slider, {start: [0, 100],
            connect: true,
            step: 5,
            tooltips: [true, true],
            behaviour: 'drag',
            range: {
                'min': 0,
                'max': 100
            }
        });
        setTimeout(() => { this.setSliderEvent(); }, 500);
    }

    public setSliderEvent() {
        var slider: any = document.getElementById('scoreRange');
        slider.noUiSlider.on('end', () => { this.onSliderChange(); });
    }

    public onSliderChange() {
        console.log(this.slideChangeBusy);

        var slider: any = document.getElementById('scoreRange');
        if (slider) {
            var sliderVals = slider.noUiSlider.get();
            var botRange = parseInt(sliderVals[0]);
            var topRange = parseInt(sliderVals[1]);

            if ((this.criteria.pointsRangeBottom === botRange && this.criteria.pointsRangeTop === topRange) || this.slideChangeBusy)
                return;

            slider.noUiSlider.off('end');
            this.slideChangeBusy = true;

            this.criteria.pointsRangeBottom = botRange;
            this.criteria.pointsRangeTop = topRange;
            this.broadcastChanges();
            this.enableSlider();
        }
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