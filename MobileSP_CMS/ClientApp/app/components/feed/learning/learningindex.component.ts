import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { TextFeedItemFormComponent} from '../modelforms/textfeeditem.component.ts'
import { IFeedItem } from "../../models/interfaces/feedinterfaces";

@Component({
    selector: 'feedindex',
    template: require('./learningindex.component.html')
})
export class LearningIndexComponent {
    public feedItems: IFeedItem[];

    constructor(http: Http) {
        http.get('/api/Feed/GetFeedItems').subscribe(result => {
            this.feedItems = result.json();
        });
    }
}



