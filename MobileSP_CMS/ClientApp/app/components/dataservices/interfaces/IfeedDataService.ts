import {Observable} from 'rxjs/Observable';
import * as Feedinterfaces from "../../models/interfaces/feedinterfaces";
import * as Feedclasses from "../../models/feedclasses";
import * as Enums from "../../enums";

export interface IFeedDataService {
    getFeeditems();

    getFeeditem<TFeedItem extends Feedclasses.BaseFeed>(id: number, feedItem: { new ({}): TFeedItem; });

    updateFeeditem(updateUrl:string, feedItem: Feedinterfaces.IFeedItem);

    deleteFeeditem(feedItem: Feedinterfaces.IFeedItem);
}