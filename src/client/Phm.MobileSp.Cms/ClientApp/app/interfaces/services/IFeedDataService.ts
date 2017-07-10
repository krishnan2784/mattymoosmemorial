import {Observable} from 'rxjs/Observable';
import Enums = require("../../enums");
import FeedModel = require("../models/IFeedModel");
import Feedclasses = require("../../models/feedclasses");
import BaseFeed = Feedclasses.BaseFeed;

export interface IFeedDataService {
    getFeeditems(): Observable<FeedModel.IFeedItem[]>;

    getFeeditemsByCat(selectedCat: Enums.FeedCategoryEnum): Observable<FeedModel.IFeedItem[]>;

    getFeeditemsByType(selectedCat: Enums.FeedTypeEnum): Observable<FeedModel.IFeedItem[]>;

    getFeeditem(id: number): Observable<FeedModel.IFeedItem> ;

    updateFeeditem(updateUrl: string, feedItem: FeedModel.IFeedItem);
    
    deleteFeeditem(feedItemId: number): Observable<boolean>;

    getQuizFeedItemReport(feedItemId: number): Observable<any>;

    getFeedItemResultList(feedItemId: number, lowerBoundary: number, higherBoundary: number, userGroupId: number);
}