import {Observable} from 'rxjs/Observable';
import * as IFeedModels from "../models/IFeedModel";
import * as Feedclasses from "../../models/feedclasses";
import * as Enums from "../../enums";

export interface IFeedDataService {
    getFeeditems(): Observable<IFeedModels.IFeedItem[]>;

    getFeeditemsByCat(selectedCat: Enums.FeedCategoryEnum): Observable<IFeedModels.IFeedItem[]>;

    getFeeditem<TFeedItem extends Feedclasses.BaseFeed>(id: number, feedItem: { new ({}): TFeedItem; });

    updateFeeditem(updateUrl: string, feedItem: IFeedModels.IFeedItem);

    deleteFeeditem(feedItem: IFeedModels.IFeedItem);
}