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
    selector: 'surveyfeeditemreport',
    template: require('./surveyfeeditemreport.component.html'),
    styles: [require('./quizfeeditemreport.component.css'), require('./surveyfeeditemreport.component.css')]
})
export class SurveyFeedItemReport implements OnInit, AfterViewInit, OnDestroy {
    @Output()
    public onBackEvent: EventEmitter<any>;

    public model: IFeedItem;
    public pageTitle: string;
    public feedTypeString: string;
    public feedTypes = Enums.FeedTypeEnum;

    public summaryData: FeedItemSummary;
    public listData: FeedItemSummaryEx[];
    
    public submissionRateData: GaugeChartData;
    public averageTimeData: BarChartData;

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
    }

    private getData() {
        this.getHeaderData();
        this.getResultListData();
    }

    getHeaderData() {
        this.feedDataService.getQuizFeedItemReport(this.model.id).subscribe(result => {
            this.summaryData = result.content;
            this.updateGaugeData();
            this.updateBarData();
        });
    }

    getResultListData() {

    }

    public updateGaugeData() {
        var gaugeData = new GaugeChartData({
            height: 150,
            showTooltip: true,
            chartData: [
                {
                    name: 'Submitted',
                    colour: '#9F378E',
                    data: (this.summaryData.passed / this.summaryData.submitted) * 100
                }
            ]
        });
        this.submissionRateData = gaugeData;
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
            width: 500,
            showTooltip: true,
            showYAxis: false,
            showXAxis: true,
            chartData: [{
                name: 's',
                colour: '#9F378E',
                data: dates
            }]
        });
        this.averageTimeData = barData;
    }
    

    public goBack() {
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
        this.onBackEvent.emit();
    }
}