import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IFeedItem } from "../../models/interfaces/feedinterfaces";
import { CreateFeedTypeSelectorComponent } from "../createfeedtype.component";
import Enums = require("../../enums");

@Component({
    selector: 'feedindex',
    template: require('./learningindex.component.html')
})
export class LearningIndexComponent {
    public feedItems: IFeedItem[];
    feedTypes : typeof Enums.FeedTypeEnum = Enums.FeedTypeEnum;
    feedCats : typeof Enums.FeedCategoryEnum = Enums.FeedCategoryEnum;

    constructor(http: Http) {
        http.get('/api/Feed/GetFeedItems').subscribe(result => {
            this.feedItems = result.json();
        });
    }
}



