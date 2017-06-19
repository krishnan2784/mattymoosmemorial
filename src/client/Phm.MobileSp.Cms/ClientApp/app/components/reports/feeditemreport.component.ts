import { Component, OnInit, ElementRef, Input, Output, ViewChild, EventEmitter, Injector } from '@angular/core';
import Baseclasses = require("../../models/baseclasses");
import BaseModel = Baseclasses.BaseModel;
import Basecomponent = require("../base.component");
import BaseComponent = Basecomponent.BaseComponent;
import Datashareservice = require("../../dataservices/datashareservice");
import ShareService = Datashareservice.ShareService;
import FeedModel = require("../../interfaces/models/IFeedModel");
import IFeedItem = FeedModel.IFeedItem;
import Enums = require("../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feeddataservice = require("../../dataservices/feeddataservice");
import FeedDataService = Feeddataservice.FeedDataService;
import Chartclasses = require("../../models/chartclasses");
import BarChartData = Chartclasses.BarChartData;
import Barchartcomponent = require("../charts/barchart.component");
import GaugeChartData = Chartclasses.GaugeChartData;
import DonutChartData = Chartclasses.DonutChartData;
import Reportclasses = require("../../models/reportclasses");
import FeedItemSummary = Reportclasses.FeedItemSummary;
declare var  Materialize: any;

@Component({
    selector: 'feeditemreport',
    template: require('./feeditemreport.component.html'),
    styles: [require('./feeditemreport.component.css')]
})
export class FeedItemReport implements OnInit {
    @Output()
    public onBackEvent: EventEmitter<any>;

    public model: IFeedItem;
    public pageTitle: string;
    public feedTypeString: string;
    public feedTypes = Enums.FeedTypeEnum;

    public reportData: FeedItemSummary;

    public totalLearners: number = 100;

    public passRatioData: GaugeChartData;
    public averageScoreData: DonutChartData;
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

    private getData() {
        this.feedDataService.getFeedItemReport(this.model.id).subscribe((result) => {
            if (result.success) {
                //this.reportData = new FeedItemSummary(result.content);
                this.reportData = new FeedItemSummary({});
                this.updateReport();
            } else {
                Materialize.toast(result.message, 5000, 'red');
                this.goBack();
            }
        });
    }

    updateReport() {
        //if (this.reportData) {
        //    this.averageTimeData = new BarChartData();
        //}
        var barData = new BarChartData({});
        this.averageTimeData = barData;
        var gaugeData = new GaugeChartData({
            height: 150,
            chartData: [
                {
                    name: 'Passed',
                    colour: '#9F378E',
                    data: (this.reportData.passed / this.reportData.submitted) * 100
                }
            ]
        });
        this.passRatioData = gaugeData;
        var donutData = new DonutChartData({
            chartData: [
                {
                    name: 'Pass',
                    colour: '#9F378E',
                    data: [this.reportData.averageScore]
                }, {
                    name: 'Fail',
                    colour: '#ECECEC',
                    data: [100 - this.reportData.averageScore]
                }]
        });
        this.averageScoreData = donutData;
    }

    public goBack() {
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
        this.onBackEvent.emit();
    }
}