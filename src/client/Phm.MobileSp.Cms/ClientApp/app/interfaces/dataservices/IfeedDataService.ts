import {Observable} from 'rxjs/Observable';
import Enums = require("../../enums");
import FeedModel = require("../models/IFeedModel");

export interface IFeedDataService {
    getFeeditems(): Observable<FeedModel.IFeedItem[]>;

    getFeeditemsByCat(selectedCat: Enums.FeedCategoryEnum): Observable<FeedModel.IFeedItem[]>;

    getFeeditem<TFeedItem extends BaseFeed>(id: number, feedItem: { new ({}): TFeedItem; });

    updateFeeditem(updateUrl: string, feedItem: FeedModel.IFeedItem);

    deleteFeeditem(feedItem: FeedModel.IFeedItem);
}