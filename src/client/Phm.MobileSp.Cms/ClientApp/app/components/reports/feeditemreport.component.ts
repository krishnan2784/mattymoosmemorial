import { Component, OnInit, ElementRef, Input, ViewChild } from '@angular/core';
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
    @Input()
    private model: IFeedItem;

    @Input()
    private pageTitle: string;
    private feedCatString: string;

    public reportData: any;

    public averageTimeData: BarChartData;

    constructor(sharedService: ShareService, public feedDataService: FeedDataService) { 
        super(sharedService, '', false);
    }

    ngOnInit() {
        if (!this.pageTitle)
            this.pageTitle = this.model.feedType.toString() + ' Analytics Reports';
        this.updatePageTitle(this.pageTitle);
        this.feedCatString = this.model.feedCategory.toString();

        this.getData();
    }

    private getData() {
        this.feedDataService.getFeedItemReport(this.model.id).subscribe((result) => {
            this.reportData = result.content;
            this.updateReport();
            //if (result.success) {
            //    this.reportData = result.content;
            //    this.updateReport();
            //} else {
            //    Materialize.toast(result.message, 5000, 'red');
            //    this.goBack();
            //}
        });
    }

    updateReport() {
        this.averageTimeData = new BarChartData();

        //if (this.reportData) {
        //    this.averageTimeData = new BarChartData();
        //}

    }

    private goBack() {
        this.pageTitle = null;
        this.model = null;
        this.averageTimeData = null;
    }
}