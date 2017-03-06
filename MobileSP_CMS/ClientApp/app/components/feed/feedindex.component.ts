import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { CreateFeedItemFormComponent} from './createfeeditem.component.ts'
import Feedclasses = require("../classes/feedclasses");

@Component({
    selector: 'feedindex',
    template: require('./feedindex.component.html')
})
export class FeedIndexComponent {
    public feedItems: Feedclasses.FeedItem[];

    constructor(http: Http) {
        http.get('/api/Feed/GetFeedItems').subscribe(result => {
            this.feedItems = result.json();
        });
    }
}



