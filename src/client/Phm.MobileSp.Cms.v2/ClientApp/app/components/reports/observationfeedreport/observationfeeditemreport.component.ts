import { Component, OnInit, Output, EventEmitter, Injector, AfterViewInit, OnDestroy } from '@angular/core';
import { Angular2Csv } from "angular2-csv/Angular2-csv";
import {SurveyFeed} from "../../../models/feedclasses";
import {FeedTypeEnum} from "../../../../enums";
import {SurveyItemSummary, ObservationItemSummary } from "../../../models/reportclasses";
import {ShareService} from "../../../shared/services/helpers/shareservice";
import {FeedDataService} from "../../../shared/services/feeddataservice";
import {DateEx} from "../../../classes/helpers/date";


@Component({
    selector: 'observationfeeditemreport',
    template: require('./observationfeeditemreport.component.html'),
    styles: [require('../quizfeedreport/quizfeeditemreport.component.css'), require('./observationfeeditemreport.component.css')]
})
export class ObservationFeedItemReport implements OnInit, AfterViewInit, OnDestroy {
    @Output()
    public onBackEvent: EventEmitter<any>;

    public model: SurveyFeed;
    public pageTitle: string;
    public feedTypeString: string;
    public feedTypes = FeedTypeEnum;

    public summaryData: SurveyItemSummary;
    public listData = [];
    
    public submissionRateData;
    public averageTimeData;
	public backSub;

    constructor(private sharedService: ShareService, public feedDataService: FeedDataService,
        private injector: Injector) { 
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
        this.feedTypeString = FeedTypeEnum[this.model.feedType];
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
        this.feedDataService.getObservationFeedSummaries(this.model.id).subscribe(result => {
            if (result.content) {
                this.summaryData = new ObservationItemSummary(result.content);
                this.updateGaugeData();
                this.updateBarData();
                this.updateListData();
            } else
                this.summaryData = new ObservationItemSummary();
            this.updateGaugeData();
            this.updateBarData();
            this.updateListData();
        });
    }

    public updateGaugeData() {
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
    }

    public updateListData() {
        if (this.model && this.summaryData && this.summaryData.surveyFeedResults) {
            console.log(this.summaryData.surveyFeedResults);

            for (let question of this.model.questions) {
                var data = [];
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
