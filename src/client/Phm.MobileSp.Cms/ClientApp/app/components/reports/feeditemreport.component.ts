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

declare var  Materialize: any;

@Component({
    selector: 'feeditemreport',
    template: require('./feeditemreport.component.html'),
    styles: [require('./feeditemreport.component.css')]
})
export class FeedItemReport extends BaseComponent implements OnInit {
    @Output()
    public onBackEvent: EventEmitter<any>;

    public model: IFeedItem;
    public pageTitle: string;
    public feedTypeString: string;
    public feedTypes = Enums.FeedTypeEnum;

    public reportData: any;

    public totalLearners: number = 100;

    public averageTimeData: BarChartData = new BarChartData();

    constructor(sharedService: ShareService, public feedDataService: FeedDataService,
        private injector: Injector) { 
        super(sharedService, '', false);
        this.model = this.injector.get('model');
        this.pageTitle = this.injector.get('pageTitle');
    }

    ngOnInit() {
        if (!this.pageTitle || this.pageTitle === '')
            this.pageTitle = Enums.FeedTypeEnum[this.model.feedType] + ' Analytics Reports';
        this.updatePageTitle(this.pageTitle);

        this.feedTypeString = Enums.FeedTypeEnum[this.model.feedType];

        this.getData();
    }

    private getData() {
        this.feedDataService.getFeedItemReport(this.model.id).subscribe((result) => {
            if (result.success) {
                this.reportData = result.content;
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
        var barData = new BarChartData({
            xLegend: "Allocated time / Submitted by day",
            yLegend: "Number of learners"
        });
        this.averageTimeData = barData;
    }

    private goBack() {
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
        this.onBackEvent.emit();
    }
}