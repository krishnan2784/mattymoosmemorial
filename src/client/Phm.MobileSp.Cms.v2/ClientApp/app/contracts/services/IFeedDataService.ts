import { Observable } from 'rxjs/Observable';import {IFeedItem} from "../models/IFeedModel";import {FeedCategoryEnum, FeedTypeEnum } from "../../../enums";

export interface IFeedDataService {
    getFeeditems(): Observable<IFeedItem[]>;

    getFeeditemsByCat(selectedCat: FeedCategoryEnum): Observable<IFeedItem[]>;

    getFeeditemsByType(selectedCat: FeedTypeEnum): Observable<IFeedItem[]>;

    getFeeditem(id: number): Observable<IFeedItem> ;

    updateFeeditem(updateUrl: string, feedItem: IFeedItem);
    
    deleteFeeditem(feedItemId: number): Observable<boolean>;

    getQuizFeedItemReport(feedItemId: number): Observable<any>;

    getFeedItemResultList(feedItemId: number, lowerBoundary: number, higherBoundary: number, userGroupId: number);

    getSurveyFeedSummaries(feedItemId: number): Observable<any>;

    getObservationFeedSummaries(feedItemId: number): Observable<any>;
}
