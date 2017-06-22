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
declare var  Materialize: any;
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
    
    public passRatioData: GaugeChartData;
    public averageScoreData: DonutChartData;
    public averageTimeData: BarChartData;

    public rangeBottom:number = 0;
    public rangeTop: number = 100;

    public slideChangeBusy = false;

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
        this.setupRangeSlider();
        this.getData();
    }

    ngOnDestroy() {
        var slider: any = document.getElementById('scoreRange');
        if (slider) {
            slider.noUiSlider.off('end');
        }
    }

    private getData() {
        this.feedDataService.getFeedItemReport(this.model.id).subscribe(result => {
            if (result.success) {
                this.summaryData = result.content;
                this.updateReport();
            } else {
                Materialize.toast(result.message, 5000, 'red');
                this.goBack();
            }
        });
        console.log(this.rangeTop);

        this.feedDataService.getFeedItemResultList(this.model.id, this.rangeBottom, this.rangeTop, 0).subscribe((result) => {
            this.listData = result.content;
        });
    }

    updateReport() {
        //if (this.summaryData) {
        //    this.averageTimeData = new BarChartData();
        //}
        var barData = new BarChartData({
            showTooltip: true,
            showYAxis: false,
            showXAxis: true
        });
        this.averageTimeData = barData;
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

    public clearFilters() {
        // not implemented
    }

    enableSlider() {
        this.setEvent();
        this.slideChangeBusy = false;
    }

    private resetRange() {
        var slider: any = document.getElementById('scoreRange');
        slider.noUiSlider.reset();
        this.onSliderChange();
    }

    private setupRangeSlider() {
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

        setTimeout(() => { this.setEvent(); }, 500);
    }

    setEvent() {
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
            this.getData();
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