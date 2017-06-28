import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter, Injector, AfterViewInit, OnDestroy } from '@angular/core';
import Baseclasses = require("../../models/baseclasses");
import BaseModel = Baseclasses.BaseModel;
import Basecomponent = require("../base.component");
import BaseComponent = Basecomponent.BaseComponent;
import Datashareservice = require("../../services/helpers/shareservice");
import ShareService = Datashareservice.ShareService;
import FeedModel = require("../../interfaces/models/IFeedModel");
import IFeedItem = FeedModel.IFeedItem;
import Enums = require("../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feeddataservice = require("../../services/feeddataservice");
import FeedDataService = Feeddataservice.FeedDataService;
import Chartclasses = require("../../models/chartclasses");
import BarChartData = Chartclasses.BarChartData;
import Barchartcomponent = require("../charts/barchart.component");
import GaugeChartData = Chartclasses.GaugeChartData;
import DonutChartData = Chartclasses.DonutChartData;
import Reportclasses = require("../../models/reportclasses");
import FeedItemSummary = Reportclasses.FeedItemSummary;
import FeedItemSummaryEx = Reportclasses.FeedItemSummaryEx;
import Date1 = require("../../classes/helpers/date");
import DateEx = Date1.DateEx;
declare var Materialize: any;
declare var noUiSlider: any;

@Component({
    selector: 'feeditemreport',
    template: require('./feeditemreport.component.html'),
    styles: [require('./feeditemreport.component.css')]
})
export class FeedItemReport implements OnInit, AfterViewInit, OnDestroy {
    @Output()
    public onBackEvent: EventEmitter<any>;

    public model: IFeedItem;
    public pageTitle: string;
    public feedTypeString: string;
    public feedTypes = Enums.FeedTypeEnum;

    public summaryData: FeedItemSummary;
    public listData: FeedItemSummaryEx[];
    get filteredListData(): FeedItemSummaryEx[]{
        return this.filterResultList();
    };
    
    public passRatioData: GaugeChartData;
    public averageScoreData: DonutChartData;
    public averageTimeData: BarChartData;

    public rangeBottom:number = 0;
    public rangeTop: number = 100;

    public userGroupFilters: {id:string, text:string, checked: boolean}[] =[];
    public dealershipFilters: { id: string, text: string, checked: boolean }[] = [];
    public searchString: string = "";

    public slideChangeBusy = false;

    constructor(private sharedService: ShareService, public feedDataService: FeedDataService,
        private injector: Injector) { 
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];
        this.getMarketFilters();

        this.sharedService.goBackEvent.subscribe(() => {
            this.onBackEvent.emit();
        });
    }

    ngOnInit() {
        this.getData();
    }

    ngAfterViewInit() {
        this.setupRangeSlider();
    }

    ngOnDestroy() {
        var slider: any = document.getElementById('scoreRange');
        if (slider) {
            slider.noUiSlider.off('end');
        }
    }

    private getData() {
        this.getHeaderData();
        this.getResultListData();
    }

    getHeaderData() {
        this.feedDataService.getFeedItemReport(this.model.id).subscribe(result => {
            if (result.success) {
                this.summaryData = result.content;
                this.updateReport();
            } else {
                Materialize.toast(result.message, 5000, 'red');
                this.goBack();
            }
        });
    }

    getResultListData() {
        this.feedDataService.getFeedItemResultList(this.model.id, this.rangeBottom, this.rangeTop, 0).subscribe((result) => {
            this.listData = result.content;
        });
    }

    filterResultList(): FeedItemSummaryEx[] {
        if (!this.listData)
            return null;
        var data = Object.assign([], this.listData);
        var userFilters = this.userGroupFilters.filter(x => x.checked);
        if (userFilters.length > 0)
            data = data.filter(x => userFilters.filter(y => y.text === x.mainUserGroup).length > 0);

        var dealerFilters = this.dealershipFilters.filter(x => x.checked);
        if (dealerFilters.length > 0)
            data = data.filter(x => dealerFilters.filter(y => y.text === x.dealershipName).length > 0);

        if (this.searchString !== "") {
            var search = this.searchString.toLowerCase();
            data = data.filter(x => x.user.firstName.toLowerCase().indexOf(search) > -1
                || x.user.lastName.toLowerCase().indexOf(search) > -1);
        }
        return data;
    }

    getMarketFilters() {
        this.feedDataService.getQuizSummaryFilters().subscribe((result) => {
            if (result) {
                if (result.userGroupNames) {
                    result.userGroupNames.forEach((group) => {
                        this.userGroupFilters.push({ id: group.replace(" ", "_"), text: group, checked: false });
                    });
                }
                if (result.dealershipNames) {
                    result.dealershipNames.forEach((group) => {
                        this.dealershipFilters.push({ id: group.replace(" ", "_"), text: group, checked: false });
                    });
                }
            }
        });
    }

    updateReport() {
        this.updateGaugeData();
        this.updateDonutData();
        this.updateBarData();
    }

    public updateGaugeData() {
        var gaugeData = new GaugeChartData({
            height: 150,
            showTooltip: true,
            chartData: [
                {
                    name: 'Passed',
                    colour: '#9F378E',
                    data: (this.summaryData.passed / this.summaryData.submitted) * 100
                }
            ]
        });
        this.passRatioData = gaugeData;
    }

    public updateDonutData() {
        var donutData = new DonutChartData({
            showLegend: false,
            showTooltip: false,
            title: this.summaryData.averageScore + '%',
            chartData: [
                {
                    name: 'Average Score',
                    colour: '#9F378E',
                    data: [this.summaryData.averageScore]
                }, {
                    name: 'Blank',
                    colour: '#ECECEC',
                    data: [100 - this.summaryData.averageScore]
                }]
        });
        this.averageScoreData = donutData;
    }

    public updateBarData() {
        let dates: { x: string, y: number }[] = [];
        for (let submission in this.summaryData.submissions) {
            let formatted = DateEx.formatDate(new Date(submission), "dd/MM");
            let existing = dates.find(x => x.x === formatted);
            if (existing) {
                dates.splice(dates.indexOf(existing), 1, { x: formatted, y: existing.y + 1 });
            } else {
                dates.push({ x: formatted, y: 1 });
            }
        }
        var barData = new BarChartData({
            showTooltip: true,
            showYAxis: false,
            showXAxis: true,
            chartData: [{
                name: 'Number of learners',
                colour: '#9F378E',
                data: dates
            }]
        });
        this.averageTimeData = barData;
    }

    public clearFilters() {
        this.userGroupFilters.forEach(x => x.checked = false);
        this.dealershipFilters.forEach(x => x.checked = false);
        this.searchString = "";
        this.resetRange();
    }

    public clearUserFilters() {
        this.userGroupFilters.forEach(x => x.checked = false);
    }

    public clearDealerFilters() {
        this.dealershipFilters.forEach(x => x.checked = false);
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

        noUiSlider.create(slider, {
            start: [0, 100],
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

            if ((this.rangeBottom === botRange && this.rangeTop === topRange) || this.slideChangeBusy)
                return;

            slider.noUiSlider.off('end');
            this.slideChangeBusy = true;

            this.rangeBottom = botRange;
            this.rangeTop = topRange;
            this.listData = null;
            this.getResultListData();
            this.enableSlider();
        }
    }

    public goBack() {
        var slider: any = document.getElementById('scoreRange');
        if (slider) {
            slider.noUiSlider.off('end');
        }
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
        this.onBackEvent.emit();
    }
}