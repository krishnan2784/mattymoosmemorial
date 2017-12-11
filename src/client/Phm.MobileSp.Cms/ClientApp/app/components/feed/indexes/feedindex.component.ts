import { Component, OnInit, OnDestroy, EventEmitter, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeedDataService } from "../../../services/feeddataservice";
import { FeedItemForm } from "../modelforms/feeditemform.component";
import { Observable } from 'rxjs/Observable';
import { IFeedItem} from "../../../interfaces/models/IFeedModel";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import FeedCategoryEnum = Enums.FeedCategoryEnum;
import { BaseComponent} from "../../base.component";
import { ShareService } from "../../../services/helpers/shareservice";
import Userclasses = require("../../../models/userclasses");
import UserMarket = Userclasses.UserMarket;
import { DefaultTabNavs } from "../../navmenu/tabnavmenu.component";
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;


import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import Feedclasses = require("../../../models/feedclasses");
import BaseFeed = Feedclasses.BaseFeed;
import { PermissionService, CommonOperationPermissions } from "../../../services/helpers/permissionservice";
import {IndexComponent} from "../../index.component";

declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'feedindex',
    template: require('./feedindex.component.html'),
    styles: [require('./feedindex.component.css')]
})
export class FeedIndexComponent extends IndexComponent implements OnInit, OnDestroy {
	selectedModel = null;
	selectedCopyToMarketModel = null;
    modalData = null;

    public feedItems: IFeedItem[];
    feedTypes: typeof Enums.FeedTypeEnum = FeedTypeEnum;
	feedCats: typeof FeedCategoryEnum = FeedCategoryEnum;
	contentTypeEnum: typeof CopiedElementTypeEnum = CopiedElementTypeEnum;
    public catId : number;
    public filteredFeed: boolean;
    public id_sub: any;
    public currentMarket: UserMarket;
	public getFeedItemsSub;

	canPublish: boolean = true;

	constructor(private route: ActivatedRoute, private router: Router,
		public feedDataService: FeedDataService, sharedService: ShareService,
		overlay: Overlay, vcRef: ViewContainerRef, public confirmBox: Modal,
		permissionService: PermissionService) {

		super(sharedService, permissionService, '', true, '',
			DefaultTabNavs.feedIndexTabs, '/feed');

        this.setupSubscriptions();
		overlay.defaultViewContainer = vcRef;
	}

    setupSubscriptions() {
        this.sharedService.marketUpdated.subscribe((market) => {
            this.updateMarket();
        });
        //this.sharedService.feedItemUpdated.subscribe((feedItem) => {
        //    this.updateFeedItem(feedItem);
        //});
    }

    updateMarket() {
        if (!this.sharedService.currentMarket || !this.sharedService.currentMarket.id)
            return;
        this.currentMarket = this.sharedService.currentMarket;
        this.feedItems = null;
        this.getData();
    }

	ngOnInit() {
        this.id_sub = this.route.params.subscribe(
            (params: any) => {
                this.catId = +params["feedCat"];
                this.filteredFeed = !isNaN(this.catId);
                this.setPageTitle();
                this.updateMarket();
            }
        );
    }

    ngOnDestroy() {
        if (this.id_sub)
            this.id_sub.unsubscribe();
        if (this.getFeedItemsSub)
            this.getFeedItemsSub.unsubscribe();        
    }

    setPageTitle() {
        if (!this.filteredFeed) {
            this.updatePageTitle("Feed");
        } else {
            this.updatePageTitle(FeedCategoryEnum[this.catId] + " Feed");
        }
    }

	getData() {
        if (this.getFeedItemsSub)
            this.getFeedItemsSub.unsubscribe();
        this.sharedService.updateMarketDropdownEnabledState(false);

        if (!this.filteredFeed) {
            this.getFeedItemsSub = this.feedDataService.getFeeditems().subscribe((result) => {
				this.feedItems = this.sortFeed(result);
                this.sharedService.updateMarketDropdownEnabledState(true);
            });
        } else {
            this.getFeedItemsSub = this.feedDataService.getFeeditemsByCat(this.catId).subscribe((result) => {
                this.feedItems = this.sortFeed(result);
                this.sharedService.updateMarketDropdownEnabledState(true);
            });
        }
    }

    sortFeed(feedItems: IFeedItem[] =[]): IFeedItem[] {
        // basic ordering by Id descending, will need to replace with a more robust sorting mechanism / index management facility 
        if (!feedItems)
            return feedItems;
        return feedItems.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
        });
    }

    updateFeedItem(feedItem: IFeedItem = null, remove: boolean = false) {
        if (feedItem != null && this.feedItems != null) {
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

    editFeedItem(feedItem: IFeedItem = new BaseFeed(), feedCat: FeedCategoryEnum = null) {
        if (feedItem && feedItem.id > 0) {
            this.updatePageTitle("Edit Feed Content Form");
        } else {
            this.updatePageTitle("New Learning Content Form");
        }
        this.updateMarketDropdownVisibility(false);
        this.updateTabNavItems();

        this.selectedModel = feedItem;
    }

	feedItemUpdated() {
		this.feedItems = null;
        this.setPageTitle();
        this.updateMarketDropdownVisibility(true);
        this.updateTabNavItems(DefaultTabNavs.feedIndexTabs);
        this.selectedModel = null;
        this.getData();
    }

	copyFeedItemToMarket(feedItem: IFeedItem) {
		this.selectedCopyToMarketModel = feedItem;
    }

    deleteFeeditem(feedItem: IFeedItem) {
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Delete')
            .body("Are you sure to delete " + feedItem.title + '?')
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch((err: any) => console.log('ERROR: ' + err))
            .then((dialog: any) => { return dialog.result })
            .then((result: any) => {
                this.feedDataService.deleteFeeditem(feedItem.id).subscribe((result) => {
                    if (result)
                        this.updateFeedItem(feedItem, true);
                });
            })
            .catch((err: any) => { });
    }


	publishFeedItemTolive(feedItem: IFeedItem) {
		if (!this.canPublish)
			return;
        var confirmText;
        if (feedItem.published && feedItem.publishedLiveAt) {
            confirmText = feedItem.title + " has already been published. Are you sure to overwrite it?";
        } else {
            confirmText = "Are you sure to publish " + feedItem.title + "?";
        }
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Publish')
            .body(confirmText)
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch((err: any) => console.log('ERROR: ' + err))
            .then((dialog: any) => { return dialog.result })
			.then((result: any) => {
		        this.canPublish = false;
                this.feedDataService.publishContentToLive(feedItem.id).subscribe((result) => {
                    if (result) {
                        this.feedDataService.getFeeditem(feedItem.id).subscribe((result) => {
                            if (result)
                                this.updateFeedItem(result, false);
                        });
					}
	                this.canPublish = true;
                });
            })
			.catch((err: any) => { this.canPublish = true; });
    }
    
}
