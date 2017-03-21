import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { IFeedItem } from "../../../interfaces/models/IFeedModel";
import * as Enums from "../../../enums";
import { FeedDataService } from "../../../dataservices/feeddataservice";

@Component({
    selector: 'feedindex',
    template: require('./feedindex.component.html'),
    providers: [FeedDataService]
})
export class FeedIndexComponent implements OnInit, OnDestroy {
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

    onSelect(feedItem: IFeedItem) {
        this.router.navigate(['/feeditem', feedItem.id]);
    }
}
