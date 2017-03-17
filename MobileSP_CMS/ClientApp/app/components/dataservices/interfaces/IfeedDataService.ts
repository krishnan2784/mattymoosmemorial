import {Observable} from 'rxjs/Observable';
import * as Feedinterfaces from "../../models/interfaces/feedinterfaces";
import * as Feedclasses from "../../models/feedclasses";
import * as Enums from "../../enums";

export interface IFeedDataService {
    feedItems: Feedinterfaces.IFeedItem[];

    getFeedItems(feedCategory: Enums.FeedCategoryEnum): Observable<Feedinterfaces.IFeedItem[]>;

    getFeeditem<TFeedItem extends Feedclasses.BaseFeed>(id: number, feedItem: { new ({}): TFeedItem; }): Observable<Feedinterfaces.IFeedItem>;

    refreshFeeditems();

    refreshFeeditem<TFeedItem extends Feedclasses.BaseFeed>(id: number, feedItem: { new ({}): TFeedItem; });

    updateFeeditem(feedItem: Feedinterfaces.IFeedItem, updateUrl: string);

    deleteFeeditem(feedItem: Feedinterfaces.IFeedItem);
}