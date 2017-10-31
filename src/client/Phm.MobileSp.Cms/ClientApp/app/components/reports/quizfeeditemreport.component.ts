import { Component, OnInit, Output, EventEmitter, Injector, OnDestroy } from '@angular/core';
import Datashareservice = require("../../services/helpers/shareservice");
import ShareService = Datashareservice.ShareService;
import FeedModel = require("../../interfaces/models/IFeedModel");
import IFeedItem = FeedModel.IFeedItem;
import Enums = require("../../enums");
import { FeedDataService } from "../../services/feeddataservice";
import Chartclasses = require("../../models/chartclasses");
import DonutChartData = Chartclasses.DonutChartData;
import Reportclasses = require("../../models/reportclasses");
import FeedItemSummary = Reportclasses.FeedItemSummary;
import FeedItemSummaryEx = Reportclasses.FeedItemSummaryEx;
import Date1 = require("../../classes/helpers/date");
import DateEx = Date1.DateEx;
import Userfiltercomponent = require("../common/filters/userfilter.component");
import { StringEx } from "../../classes/helpers/string";
import UserFilters = Userfiltercomponent.UserFilters;

declare var Materialize: any;
declare var noUiSlider: any;

@Component({
    selector: 'quizfeeditemreport',
    template: require('./quizfeeditemreport.component.html'),
    styles: [require('./quizfeeditemreport.component.css')]
})
export class QuizFeedItemReport implements OnInit, OnDestroy {
    @Output()
    public onBackEvent: EventEmitter<any>;

    public model: IFeedItem;
    public pageTitle: string;
    public feedTypeString: string;
    public feedTypes = Enums.FeedTypeEnum;

    public summaryData: FeedItemSummary;
    public listData: FeedItemSummaryEx[];
    public filteredListData: FeedItemSummaryEx[];
    
    public passRatioData;
    public averageScoreData: DonutChartData;
    public averageTimeData;
    public filterCriteria: UserFilters = new UserFilters();
    public searchString = '';

    public backSub;
    public selectedQuizResult: FeedItemSummaryEx;

    constructor(private sharedService: ShareService, public feedDataService: FeedDataService,
        private injector: Injector) { 
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];
		this.backSub = this.sharedService.goBackEvent.subscribe(() => {
			console.log('destroyed1');

            this.onBackEvent.emit();
        });
    }

    ngOnInit() {
        this.getData();
    }

	ngOnDestroy() {
		console.log('destroyed');
        this.backSub.unsubscribe();
    }

    private getData() {
        this.getHeaderData();
        this.getResultListData();
    }

    getHeaderData() {
        this.feedDataService.getQuizFeedItemReport(this.model.id).subscribe(result => {
            if (result.success) {
                if (result.content) {
                    this.summaryData = result.content;
                    this.updateReport();
                } else
                    this.summaryData = new FeedItemSummary();
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
            data = data.filter(x => this.filterCriteria.dealershipFilters.filter(y => y.text === x.dealerShipName).length > 0);

        data = data.filter(x => x.resultPercentage >= this.filterCriteria.pointsRangeBottom &&
            x.resultPercentage <= this.filterCriteria.pointsRangeTop);

        if (this.searchString !== "") {
            data = StringEx.searchArray(this.searchString, data, ['user.firstName', 'user.lastName']);
        }

        this.filteredListData = data;
    }

    updateReport() {
        this.updateGaugeData();
        this.updateDonutData();
        this.updateBarData();
    }

    public updateGaugeData() {
        this.passRatioData = (this.summaryData.passed / this.summaryData.submitted) * 100;
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
    }

    public goBack() {
        if (this.selectedQuizResult != null)
            return;
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
        this.onBackEvent.emit();
    }

    public viewQuizBreakdown(result: FeedItemSummaryEx) {
        this.backSub.unsubscribe();
        this.selectedQuizResult = result;
        this.sharedService.updateBackButton('Learners stats');
        this.backSub = this.sharedService.goBackEvent.subscribe(() => {
            this.backSub.unsubscribe();
            this.sharedService.updateBackButton(Enums.FeedTypeEnum[this.model.feedType] + ' Reports');
            this.selectedQuizResult = null;

            this.backSub = this.sharedService.goBackEvent.subscribe(() => {
                this.onBackEvent.emit();
            });
        });
    }
}