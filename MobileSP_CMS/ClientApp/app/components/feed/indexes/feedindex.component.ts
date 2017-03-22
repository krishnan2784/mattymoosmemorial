import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IFeedItem } from "../../../interfaces/models/IFeedModel";
import * as Enums from "../../../enums";
import { FeedDataService } from "../../../dataservices/feeddataservice";
import { FeedItemForm } from "../modelforms/feeditemform.component";
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'feedindex',
    template: require('./feedindex.component.html'),
    providers: [FeedDataService]
})
export class FeedIndexComponent implements OnInit, OnDestroy {
    feedFormData = null;
    public feedItems: IFeedItem[];
    feedTypes: typeof Enums.FeedTypeEnum = Enums.FeedTypeEnum;
    feedCats: typeof Enums.FeedCategoryEnum = Enums.FeedCategoryEnum;
    public catId : number;
    public filteredFeed: boolean;
    public id_sub: any;

    constructor(private route: ActivatedRoute,
        private router: Router,
        public feedDataService: FeedDataService) {

    }

    ngOnInit() {
        this.id_sub = this.route.params.subscribe(
            (params: any) => {
                this.feedItems = null;
                this.catId = +params["feedCat"];
                this.filteredFeed = !isNaN(this.catId);
                this.getData();
            }
        );
    }

    ngOnDestroy() {
        if (this.id_sub) {
            this.id_sub.unsubscribe();
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
    
    updateFeedItem(feedItem: IFeedItem = null, feedCat: Enums.FeedCategoryEnum = null) {
        let inputs = { feedItem: feedItem, feedCat: feedCat, feedUpdated: this.getData() };

        var form = FeedItemForm;
        form.prototype.feedUpdated = new EventEmitter<IFeedItem>();
        form.prototype.feedUpdated.subscribe((feedItemResponse) => {
            let origFeedItem = this.feedItems.find(x => x.id === feedItemResponse.id);
            let index = this.feedItems.indexOf(origFeedItem);
            if (index > -1) {
                this.feedItems.splice(index, 1, feedItemResponse);
            } else {
                this.feedItems.unshift(feedItemResponse);
            }

            this.feedFormData = null;
        });

        this.feedFormData = {
            feedFormComponent: form,
            inputs: inputs
        };
    }
    
}
