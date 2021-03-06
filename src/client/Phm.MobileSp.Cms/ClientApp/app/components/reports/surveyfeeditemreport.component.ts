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
import { FeedDataService } from "../../services/feeddataservice";
import Chartclasses = require("../../models/chartclasses");
import BarChartData = Chartclasses.BarChartData;
import Barchartcomponent = require("../charts/barchart.component");
import GaugeChartData = Chartclasses.GaugeChartData;
import DonutChartData = Chartclasses.DonutChartData;
import Reportclasses = require("../../models/reportclasses");
import SurveyItemSummary = Reportclasses.SurveyItemSummary;
import Date1 = require("../../classes/helpers/date");
import DateEx = Date1.DateEx;
import Userfiltercomponent = require("../common/filters/userfilter.component");
import { SurveyFeed } from "../../models/feedclasses";
import UserFilters = Userfiltercomponent.UserFilters;
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ObservationItemSummary } from "../../models/reportclasses";

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

    public model: SurveyFeed;
    public pageTitle: string;
    public feedTypeString: string;
    public feedTypes = Enums.FeedTypeEnum;

    public summaryData: SurveyItemSummary;
    public listData = [];
    
    public submissionRateData;
    public averageTimeData;
	public backSub;

    constructor(private sharedService: ShareService, public feedDataService: FeedDataService,
        private injector: Injector) { 
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];
	    this.backSub = this.sharedService.goBackEvent.subscribe(() => {
            this.onBackEvent.emit();
        });
    }

    ngOnInit() {
        this.getData();
    }

    ngAfterViewInit() {
    }

	ngOnDestroy() {
		if (this.backSub)
			this.backSub.unsubscribe();
    }

    private getData() {
        this.feedDataService.getSurveyFeedSummaries(this.model.id).subscribe(result => {
            if (result.content) {
	            console.log(result.content);
                this.summaryData = new ObservationItemSummary(result.content);
                this.updateGaugeData();
                this.updateBarData();
            } else
                this.summaryData = new ObservationItemSummary();
            this.updateGaugeData();
            this.updateBarData();
            this.updateListData();
        });
    }

    public updateGaugeData() {
        //var gaugeData = new GaugeChartData({
        //    height: 150,
        //    showTooltip: true,
        //    chartData: [
        //        {
        //            name: 'Submitted',
        //            colour: '#9F378E',
        //            data: (this.summaryData.submitted / this.summaryData.totalRecipents) * 100
        //        }
        //    ]
        //});
        this.submissionRateData = (this.summaryData.submitted / this.summaryData.totalRecipents) * 100;
    }

    public updateBarData() {
        let dates: { label: string, percent: number }[] = [];
        for (let submission in this.summaryData.submissions) {
            let formatted = DateEx.formatDate(new Date(submission), "dd/MM");
            let existing = dates.find(x => x.label === formatted);
            if (existing) {
                dates.splice(dates.indexOf(existing), 1, { label: formatted, percent: existing.percent + 1 });
            } else {
                dates.push({ label: formatted, percent: 1 });
            }
        }
        this.averageTimeData = {
            legendText: "Submissions",
            footerText: "Allocated time (days)",
            data: dates
        }
        //let dates: { x: string, y: number }[] = [];
        //for (let submission in this.summaryData.submissions) {
        //    let formatted = DateEx.formatDate(new Date(submission), "dd/MM");
        //    let existing = dates.find(x => x.x === formatted);
        //    if (existing) {
        //        dates.splice(dates.indexOf(existing), 1, { x: formatted, y: existing.y + 1 });
        //    } else {
        //        dates.push({ x: formatted, y: 1 });
        //    }
        //}
        //if (dates.length == 0) {
        //    dates.push({ x: "11/07", y: 2 });
        //    dates.push({ x: "12/07", y: 4 });
        //}
        //var barData = new BarChartData({
        //    width: 500,
        //    showTooltip: true,
        //    showYAxis: false,
        //    showXAxis: true,
        //    chartData: [{
        //        name: 'Allocated time (days)',
        //        colour: '#9F378E',
        //        data: dates
        //    }]
        //});
        //this.averageTimeData = barData;
    }

    public updateListData() {
        this.listData = [];
        if (this.model && this.summaryData && this.summaryData.surveyFeedResults) {
            for (let question of this.model.questions) {
                var data = []
                question.answers.forEach(x => {
                    try {
                        data.push({
                            percent: this.summaryData.surveyFeedResults.find(y => y.surveyQuestionId == question.id).surveyAnswerSummaries.find(y => y.surverQuestionAnwerId == x.id).percentage,
                            label: x.answer
                        });
                    } catch (e) {
                       console.log(e);
                    }
                });
                this.listData.push({
                    title: question.question,
                    data: data
                });
            };
        }
    }

    handleReport() {
        let report = [{ 'title': 'Question', 'question': 'Answer', 'percent': 'Percent' }];
        for (var i = 0; i < this.listData.length; i++) {
            for (var i2 = 0; i2 < this.listData[i].data.length; i2++) {
                report.push({
                    title: this.listData[i].title,
                    question: this.listData[i].data[i2].label,
                    percent: this.listData[i].data[i2].percent
                });
            }
        }
        new Angular2Csv(report, this.model.title + DateEx.formatDate(new Date()));
    }

    public goBack() {
        this.pageTitle = null;
		this.model = null;
	    this.backSub.unsubscribe();
        this.averageTimeData = null;
        this.onBackEvent.emit();
    }
}