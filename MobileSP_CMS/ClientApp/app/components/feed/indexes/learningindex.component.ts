import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IFeedItem } from "../../models/interfaces/feedinterfaces";
import { CreateFeedTypeSelectorComponent } from "../createfeedtype.component";
import * as Enums from "../../enums";
import * as DataService from "../../dataservices/interfaces/IFeedDataService";
import * as Service from "../../dataservices/FeedDataService";

@Component({
    selector: 'feedindex',
    template: require('./learningindex.component.html')
})
export class LearningIndexComponent {
    public feedDataService: DataService.IFeedDataService;
    feedTypes : typeof Enums.FeedTypeEnum = Enums.FeedTypeEnum;
    feedCats : typeof Enums.FeedCategoryEnum = Enums.FeedCategoryEnum;

    constructor(http: Http) {
        this.feedDataService = new Service.FeedDataService(http);
    }
}



