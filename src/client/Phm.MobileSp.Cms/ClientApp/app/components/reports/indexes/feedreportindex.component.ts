import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeedDataService } from "../../../dataservices/feeddataservice";
import { IFeedItem} from "../../../interfaces/models/IFeedModel";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import FeedCategoryEnum = Enums.FeedCategoryEnum;
import { BaseComponent} from "../../base.component";
import { ShareService } from "../../../dataservices/datashareservice";
import Userclasses = require("../../../models/userclasses");
import UserMarket = Userclasses.UserMarket;
import Feeditemreportcomponent = require("../feeditemreport.component");
import FeedItemReport = Feeditemreportcomponent.FeedItemReport;
declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'feedreportindex',
    template: require('./feedreportindex.component.html'),
    styles: [require('./feedreportindex.component.css')]
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

        super(sharedService, 'Reports', true);
        this.setupSubscriptions();
    }

    setupSubscriptions() {
        this.sharedService.marketUpdated.subscribe((market) => {
            this.currentMarket = market;
            this.feedItems = null;
            this.getData();
        });
    }

    ngOnInit() {
        this.id_sub = this.route.params.subscribe(
            (params: any) => {
                this.feedItems = null;
                this.feedTypeId = +params["feedType"];
                this.getData();
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
            this.feedItems = this.sortFeed(result);
        });
    }

    sortFeed(feedItem: IFeedItem[]): IFeedItem[] {
        // basic ordering by Id descending, will need to replace with a more robust sorting mechanism / index management facility 
        return feedItem.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
        });
    }
    
    viewFeedItemDetails(feedItem: IFeedItem = null) {
        let inputs = { model: feedItem, pageTitle: '' };
        var report = FeedItemReport;
        this.updateMarketDropdownVisibility(false);
        this.updateBackText('Back to Reports Index');
        this.updatePageTitle(Enums.FeedTypeEnum[feedItem.feedType] + ' Analytics Reports');

        report.prototype.onBackEvent = new EventEmitter();
        report.prototype.onBackEvent.subscribe(() => {
            this.setPageTitle();
            this.updateMarketDropdownVisibility(true);
            this.updateBackText('');
            this.selectedItem = null;
        });
        this.selectedItem = {
            reportContent: FeedItemReport,
            inputs: inputs
        };
    }
}
