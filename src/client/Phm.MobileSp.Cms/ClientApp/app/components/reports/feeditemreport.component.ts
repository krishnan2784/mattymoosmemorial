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
import Userfiltercomponent = require("../common/filters/userfilter.component");
import UserFilters = Userfiltercomponent.UserFilters;

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
    public filteredListData: FeedItemSummaryEx[];
    
    public passRatioData: GaugeChartData;
    public averageScoreData: DonutChartData;
    public averageTimeData: BarChartData;

    public filterCriteria: UserFilters = new UserFilters();
    public searchString = '';

    constructor(private sharedService: ShareService, public feedDataService: FeedDataService,
        private injector: Injector) { 
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];

        this.sharedService.goBackEvent.subscribe(() => {
            this.onBackEvent.emit();
        });
    }

    ngOnInit() {
        this.getData();
    }

    ngAfterViewInit() {
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
        this.feedDataService.getFeedItemResultList(this.model.id, this.filterCriteria.pointsRangeBottom, this.filterCriteria.pointsRangeTop, 0).subscribe((result) => {
            this.listData = result.content;
            this.filterResultList();
        });
    }

    filterUpdate(criteria: UserFilters) {
        this.filterCriteria = criteria;
        this.filterResultList();
    }

    filterResultList() {
        if (!this.listData)
            return null;
        var data = Object.assign([], this.listData);

        if (this.filterCriteria.userGroupFilters.length > 0)
            data = data.filter(x => this.filterCriteria.userGroupFilters.filter(y => y.text === x.mainUserGroup).length > 0);
        
        if (this.filterCriteria.dealershipFilters.length > 0)
            data = data.filter(x => this.filterCriteria.dealershipFilters.filter(y => y.text === x.dealershipName).length > 0);

        if (this.searchString !== "") {
            var search = this.searchString.toLowerCase();
            data = data.filter(x => x.user.firstName.toLowerCase().indexOf(search) > -1
                || x.user.lastName.toLowerCase().indexOf(search) > -1);
        }

        data = data.filter(x => x.resultPercentage >= this.filterCriteria.pointsRangeBottom &&
            x.resultPercentage <= this.filterCriteria.pointsRangeTop);

        this.filteredListData = data;
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