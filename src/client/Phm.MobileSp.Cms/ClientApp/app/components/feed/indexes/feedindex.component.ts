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
import Copytomarketcomponent = require("../modals/copytomarket.component");
import { DefaultTabNavs } from "../../navmenu/tabnavmenu.component";
import FeedItemCopyToMarket = Copytomarketcomponent.FeedItemCopyToMarket;
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;


import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

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

    constructor(private route: ActivatedRoute, private router: Router, public feedDataService: FeedDataService, sharedService: ShareService, overlay: Overlay, vcRef: ViewContainerRef, public confirmBox: Modal) {
        super(sharedService, '', true, '', DefaultTabNavs.feedIndexTabs);
        this.setupSubscriptions();
        overlay.defaultViewContainer = vcRef;
    }

    setupSubscriptions() {
        this.sharedService.marketUpdated.subscribe((market) => {
            this.updateMarket();
        });
        this.sharedService.feedItemUpdated.subscribe((feedItem) => {
            this.updateFeedItem(feedItem);
        });
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
        this.updateTabNavItems();

        form.prototype.feedUpdated = new EventEmitter<IFeedItem>();
        form.prototype.feedUpdated.subscribe((feedItemResponse) => {
            this.setPageTitle();
            this.updateMarketDropdownVisibility(true);
            this.updateTabNavItems(DefaultTabNavs.feedIndexTabs);
            this.feedFormData = null;
        });

        this.feedFormData = {
            feedFormComponent: form,
            inputs: inputs
        };
    }

    copyFeedItemToMarket(feedItem: IFeedItem) {
        let inputs = { model: feedItem, contentType: CopiedElementTypeEnum.Feed, marketContentService: this.feedDataService };
        var modelData = FeedItemCopyToMarket;

        this.modalData = {
            modalContent: modelData,
            inputs: inputs
        };
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
        var confirmText;
        if (feedItem.publishedLiveAt) {
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
                this.feedDataService.publishContentToLive(feedItem.id).subscribe((result) => {
                    if (result) {
                        this.feedDataService.getFeeditem(feedItem.id).subscribe((result) => {
                            if (result)
                                this.updateFeedItem(result, false);
                        });
                    }
                });
            })
            .catch((err: any) => { });
    }
    
}
