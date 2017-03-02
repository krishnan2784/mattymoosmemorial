import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'feedindex',
    template: require('./feedindex.component.html')
})
export class FeedIndexComponent {
    public feedItems: IFeedItems[];

    constructor(http: Http) {
        http.get('/api/Feed/GetFeedItems').subscribe(result => {
            this.feedItems = result.json();
        });
    }
}

interface IFeedItems {
    id: number;
    title: string;
    feedType: number;
    feedCategoryEnum: number;
    points: number;
    enabled: boolean;
    published: boolean;
    marketId: string;
    createdAt: Date;
}