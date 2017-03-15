import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IFeedItem } from "../../models/interfaces/feedinterfaces";

@Component({
    selector: 'feedindex',
    template: require('./feedindex.component.html')
})
export class FeedIndexComponent {
    public feedItems: IFeedItem[];

    constructor(http: Http) {
        http.get('/api/Feed/GetFeedItems').subscribe(result => {
            this.feedItems = result.json();
        });
    }
}



