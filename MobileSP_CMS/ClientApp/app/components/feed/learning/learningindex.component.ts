import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { CreateLearningItemFormComponent} from './createlearningfeeditem.component.ts'
import Feedclasses = require("../../classes/feedclasses");

@Component({
    selector: 'feedindex',
    template: require('./learningindex.component.html')
})
export class LearningIndexComponent {
    public feedItems: Feedclasses.TextFeed[];

    constructor(http: Http) {
        http.get('/api/Feed/GetFeedItems').subscribe(result => {
            this.feedItems = result.json();
        });
    }
}



