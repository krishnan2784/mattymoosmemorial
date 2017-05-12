import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeedDataService } from "../../../dataservices/feeddataservice";
import { FeedItemForm } from "../modelforms/feeditemform.component";
import { Observable } from 'rxjs/Observable';
import { IFeedItem} from "../../../interfaces/models/IFeedModel";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import FeedCategoryEnum = Enums.FeedCategoryEnum;
import { BaseComponent} from "../../base.component";
import { ShareService } from "../../../dataservices/datashareservice";
import Userclasses = require("../../../models/userclasses");
import UserMarket = Userclasses.UserMarket;
import Copytomarketcomponent = require("../modals/copytomarket.component");
import FeedItemCopyToMarket = Copytomarketcomponent.FeedItemCopyToMarket;

declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'feedindex',
    template: require('./feedindex.component.html'),
    styles: [require('./feedindex.component.css')]
})
export class FeedIndexComponent extends BaseComponent implements OnInit, OnDestroy {
    feedFormData = null;
    modalData = null;

    public feedItems: IFeedItem[];
    feedTypes: typeof Enums.FeedTypeEnum = FeedTypeEnum;
    feedCats: typeof FeedCategoryEnum = FeedCategoryEnum;
    public catId : number;
    public filteredFeed: boolean;
    public id_sub: any;
    public currentMarket: UserMarket;

    constructor(private route: ActivatedRoute,
        private router: Router,
        public feedDataService: FeedDataService,
        sharedService: ShareService) {

        super(sharedService, '', true);
        this.setupSubscriptions();
    }

    setupSubscriptions() {
        this.sharedService.marketUpdated.subscribe((market) => {
            this.currentMarket = market;
            this.feedItems = null;
            this.getData();
        });
        this.sharedService.feedItemUpdated.subscribe((feedItem) => {
            this.updateFeedItem(feedItem);
        });
    }

    ngOnInit() {
        this.id_sub = this.route.params.subscribe(
            (params: any) => {
                this.feedItems = null;
                this.catId = +params["feedCat"];
                this.filteredFeed = !isNaN(this.catId);
                this.setPageTitle();
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
        if (!this.filteredFeed) {
            this.updatePageTitle("Feed");
        } else {
            this.updatePageTitle(FeedCategoryEnum[this.catId] + " Feed");
        }
    }

    getData() {
        if (!this.filteredFeed) {
            this.feedDataService.getFeeditems().subscribe((result) => {
                this.feedItems = this.sortFeed(result);
            });
        } else {
            this.feedDataService.getFeeditemsByCat(this.catId).subscribe((result) => {
                this.feedItems = this.sortFeed(result);
            });
        }
    }

    sortFeed(feedItem: IFeedItem[]): IFeedItem[] {
        // basic ordering by Id descending, will need to replace with a more robust sorting mechanism / index management facility 
        return feedItem.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
        });
    }

    updateFeedItem(feedItem: IFeedItem = null, remove: boolean = false) {
        if (feedItem != null) {
            let origFeedItem = this.feedItems.find(x => x.id === feedItem.id);
            let index = this.feedItems.indexOf(origFeedItem);

            if (!remove && (!this.filteredFeed || feedItem.feedCategory == this.catId)) {
                if (index > -1) {
                    this.feedItems.splice(index, 1, feedItem);
                } else {
                    this.feedItems.unshift(feedItem);
                }
            } else if (index > -1) {
                this.feedItems.splice(index, 1);
            }
        }
    }

    editFeedItem(feedItem: IFeedItem = null, feedCat: FeedCategoryEnum = null) {

        let inputs = { feedItem: feedItem, feedCat: feedCat, feedUpdated: this.getData() };
        var form = FeedItemForm;

        if (feedItem) {
            this.updatePageTitle("Edit Feed Content Form");
        } else {
            this.updatePageTitle("New Learning Content Form");
        }
        this.updateMarketDropdownVisibility(false);

        form.prototype.feedUpdated = new EventEmitter<IFeedItem>();
        form.prototype.feedUpdated.subscribe((feedItemResponse) => {
            this.setPageTitle();
            this.updateMarketDropdownVisibility(true);
            this.feedFormData = null;
        });

        this.feedFormData = {
            feedFormComponent: form,
            inputs: inputs
        };
    }

    copyFeedItemToMarket(feedItem: IFeedItem) {
        let inputs = { feedItem: feedItem };
        this.updateMarketDropdownVisibility(false);
        var modelData = FeedItemCopyToMarket;

        this.modalData = {
            modalContent: modelData,
            inputs: inputs
        };


    }

    deleteFeeditem(feedItem: IFeedItem) {
        this.feedDataService.deleteFeeditem(feedItem.id).subscribe((result) => {
            if (result)
                this.updateFeedItem(feedItem, true);
        });
    }
    
}
