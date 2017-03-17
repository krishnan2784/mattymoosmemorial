import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IFeedItem } from "../../models/interfaces/feedinterfaces";
import { CreateFeedTypeSelectorComponent } from "../createfeedtype.component";
import * as Enums from "../../enums";
import Feedinterfaces = require("../../models/interfaces/feedinterfaces");
import { FeedDataService } from "../../dataservices/feeddataservice";

@Component({
    selector: 'feedindex',
    template: require('./feedindex.component.html'),
    providers: [FeedDataService]
})
export class FeedIndexComponent {
    public feedItems: Feedinterfaces.IFeedItem[] = [];
    feedTypes: typeof Enums.FeedTypeEnum = Enums.FeedTypeEnum;
    feedCats: typeof Enums.FeedCategoryEnum = Enums.FeedCategoryEnum;
    public catId : number;

    constructor(private route: ActivatedRoute,
        private router: Router,
        public feedDataService: FeedDataService) {
        this.catId = +this.route.snapshot.params["feedCat"];
    }

    ngOnInit() {
        if (isNaN(this.catId)) {
            this.feedDataService.getFeeditems().subscribe((result) => {
                this.feedItems = result;
            });
        } else {
            this.feedDataService.getFeeditemsByCat(this.catId).subscribe((result) => {
                this.feedItems = result;
            });
        }
    }

    onSelect(feedItem: IFeedItem) {
        var url = '/' + (this.feedTypes[feedItem.feedType].toString().toLowerCase()) + 'feeditem';
        this.router.navigate([url, feedItem.id]);
    }
}
