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

@Component({
    selector: 'feedindex',
    template: require('./feedindex.component.html'),
    providers: [FeedDataService]
})
export class FeedIndexComponent extends BaseComponent implements OnInit, OnDestroy {
    feedFormData = null;
    public feedItems: IFeedItem[];
    feedTypes: typeof Enums.FeedTypeEnum = FeedTypeEnum;
    feedCats: typeof FeedCategoryEnum = FeedCategoryEnum;
    public catId : number;
    public filteredFeed: boolean;
    public id_sub: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        public feedDataService: FeedDataService,
        sharedService: ShareService) {

        super(sharedService, '', true);

        this.setupSubscriptions();
    }

    setupSubscriptions() {
        this.sharedService.marketIdUpdated.subscribe((marketId) => {
            this.feedItems = null;
            this.getData();
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
                this.feedItems = result;
            });
        } else {
            this.feedDataService.getFeeditemsByCat(this.catId).subscribe((result) => {
                this.feedItems = result;
            });
        }
    }
    
    updateFeedItem(feedItem: IFeedItem = null, feedCat: FeedCategoryEnum = null) {
        let inputs = { feedItem: feedItem, feedCat: feedCat, feedUpdated: this.getData() };

        var form = FeedItemForm;
        form.prototype.feedUpdated = new EventEmitter<IFeedItem>();
        form.prototype.feedUpdated.subscribe((feedItemResponse) => {
            
            let origFeedItem = this.feedItems.find(x => x.id === feedItemResponse.id);
            let index = this.feedItems.indexOf(origFeedItem);

            if (this.filteredFeed && feedItemResponse.feedCategory == this.catId) {
                if (index > -1) {
                    this.feedItems.splice(index, 1, feedItemResponse);
                } else {
                    this.feedItems.unshift(feedItemResponse);
                }
            } else if (index > -1) {
                this.feedItems.splice(index, 1);
            }

            this.feedFormData = null;
        });

        this.feedFormData = {
            feedFormComponent: form,
            inputs: inputs
        };
    }
    
}
