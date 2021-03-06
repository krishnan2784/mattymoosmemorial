import { Component, OnInit, OnDestroy, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeedDataService } from "../../../services/feeddataservice";
import { IFeedItem} from "../../../interfaces/models/IFeedModel";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import FeedCategoryEnum = Enums.FeedCategoryEnum;
import { BaseComponent} from "../../base.component";
import { ShareService } from "../../../services/helpers/shareservice";
import Userclasses = require("../../../models/userclasses");
import UserMarket = Userclasses.UserMarket;
import QuizFeeditemreportcomponent = require("../quizfeeditemreport.component");
import QuizFeedItemReport = QuizFeeditemreportcomponent.QuizFeedItemReport;
import { DefaultTabNavs } from "../../navmenu/tabnavmenu.component";
import { SurveyFeedItemReport } from "../surveyfeeditemreport.component";

declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'feedreportindex',
    template: require('./feedreportindex.component.html'),
    styles: [require('./feedreportindex.component.css')],
    encapsulation: ViewEncapsulation.None
})
export class FeedReportIndexComponent extends BaseComponent implements OnInit, OnDestroy {
    public feedItems: IFeedItem[];
    feedTypes: typeof Enums.FeedTypeEnum = FeedTypeEnum;
    feedCats: typeof FeedCategoryEnum = FeedCategoryEnum;
    public feedTypeId : number;
    public id_sub: any;
    public currentMarket: UserMarket;

    public selectedItem : any = null;

    constructor(private route: ActivatedRoute,
        private router: Router,
        public feedDataService: FeedDataService,
        sharedService: ShareService) {

        super(sharedService, 'Reports', true, '', DefaultTabNavs.reportsTabs);
        this.setupSubscriptions();
    }

    setupSubscriptions() {
        this.sharedService.marketUpdated.subscribe((market) => {
            this.updateMarket();
        });
    }

    updateMarket() {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
            return;
        this.currentMarket = this.sharedService.currentMarket;
        this.selectedItem = null;
        this.feedItems = null;
        this.getData();
    }

    ngOnInit() {
        this.id_sub = this.route.params.subscribe(
            (params: any) => {
                if (params["feedType"]) {
                    this.feedTypeId = +params["feedType"];
                } else
                    this.feedTypeId = FeedTypeEnum.Quiz;
                this.updateMarket();
            }
        );
    }

    ngOnDestroy() {
        if (this.id_sub) {
            this.id_sub.unsubscribe();
        }
    }

    setPageTitle() {
        this.updatePageTitle("Reports");
    }

    getData() {
        this.feedDataService.getFeeditemsByType(this.feedTypeId).subscribe((result) => {
            if (!this.sharedService.currentMarket.isLive && result && result.length > 0) {
                result = result.filter(x => x.publishedLiveAt);
            }
            this.feedItems = this.sortFeed(result);

        });
    }

    sortFeed(feedItem: IFeedItem[]): IFeedItem[] {
        if (!feedItem)
            return [];
        // basic ordering by Id descending, will need to replace with a more robust sorting mechanism / index management facility 
        return feedItem.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
        });
    }
    
    viewFeedItemDetails(feedItem: IFeedItem = null) {
        let inputs = { model: feedItem, pageTitle: '' };
        var report;
        if (feedItem.feedType === FeedTypeEnum.Quiz)
            report = QuizFeedItemReport;
        if (feedItem.feedType === FeedTypeEnum.Survey)
            report = SurveyFeedItemReport;
        if (feedItem.feedType === FeedTypeEnum.Observation)
            report = SurveyFeedItemReport;
        
        this.updateMarketDropdownVisibility(false);
        this.updateTabNavItems();
        this.updateBackText(Enums.FeedTypeEnum[feedItem.feedType] + ' Reports');
        this.updatePageTitle('');

        report.prototype.onBackEvent = new EventEmitter();
        report.prototype.onBackEvent.subscribe(() => {
            this.setPageTitle();
            this.updateMarketDropdownVisibility(true);
            this.updateBackText('');
            this.updateTabNavItems(DefaultTabNavs.reportsTabs);
            this.selectedItem = null;
        });
        this.selectedItem = {
            reportContent: report,
            inputs: inputs
        };
    }
}
