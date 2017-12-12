import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { IFeedDataService } from "../interfaces/services/IFeedDataService";
import { RequestHelper } from "./helpers/requesthelper";

import Enums = require("../enums");
import FeedModel = require("../interfaces/models/IFeedModel");
import FeedItem = FeedModel.IFeedItem;
import Feedclasses = require("../models/feedclasses");
import Apiresponse = require("../models/apiresponse");

import { DateEx } from "../classes/helpers/date";
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
import { MarketContentDataService } from "./marketcontentdataservice ";
import { IMarketContentService } from "../interfaces/services/IMarketContentService";

@Injectable()
export class FeedDataService extends MarketContentDataService implements IFeedDataService, IMarketContentService {

    constructor(public http: Http) {
		super(http, CopiedElementTypeEnum.Feed, 'Feed', '/GetMarketsByMasterId', '/CopyFeedItemToMarket');
    }

    public getFeeditems(): Observable<FeedModel.IFeedItem[]> {
        return this.getRequestBase('/api/Feed/GetFeedItems');
    }

    public getFeeditemsByCat(selectedCat: Enums.FeedCategoryEnum): Observable<FeedItem[]> {
        return Observable.create(observer => {
            this.getFeeditems().subscribe((result) => {
                if (result && result.length > 0) {
                    result = result.filter(x => x.feedCategory === selectedCat);
                }
                observer.next(result);
                observer.complete();
            });
        });
    }

    public getFeeditemsByType(selectedType: Enums.FeedTypeEnum): Observable<FeedItem[]> {
        return Observable.create(observer => {
            this.getFeeditems().subscribe((result) => {
                if (result && result.length > 0) {
                    result = result.filter(x => x.feedType === selectedType);
                }
                observer.next(result);
                observer.complete();
            });
        });
    }

    public getFeeditem(feedId: number): Observable<FeedModel.IFeedItem>  {
        return Observable.create(observer => {
			this.getRequestBase('/api/Feed/GetFeedItem?id=' + feedId).subscribe((result) => {
				if (result.length > 0)
					observer.next(result[0]);
				else
					observer.next(null);

                observer.complete();
            });
        });
    }

    public updateFeeditem(updateUrl: string, feedItem: FeedItem): Observable<Apiresponse.ApiResponse> {
        return this.postRequestFull('/api/Feed/UpdateFeedItem', feedItem);
    }

    public deleteFeeditem(feedItemId: number): Observable<boolean> {
        return this.postRequestBase('/api/Feed/DeleteFeedItem',  feedItemId);
	}

    //public copyItemToMarket(id: number, marketIds: number[]): Observable<Apiresponse.ApiResponse> {
    //    return this.copyContentToMarket('/api/Feed/CopyFeedItemToMarket', id, marketIds);
    //}

    //public publishToLive(contentId: number) {
    //    return this.publishContentToLive(CopiedElementTypeEnum.Feed, contentId);
    //}

    public getQuizFeedItemReport(feedItemId: number): Observable<any> {
        return this.getRequestFull('/api/FeedSummaries/GetQuizFeedSummaries?feedItemId=' + feedItemId);
    }

    public getFeedItemResultList(feedItemId: number, lowerBoundary: number, higherBoundary: number, userGroupId: number) {
        var requestUrl = '/api/FeedSummaries/GetQuizResultsSummariesEX?feedItemId=' + feedItemId
            + '&lowerBoundary=' + lowerBoundary
            + '&higherBoundary=' + higherBoundary
            + '&userGroupId=' + userGroupId;
        return this.getRequestFull(requestUrl);
    }

    public getSurveyFeedSummaries(feedItemId: number): Observable<any> {
        return this.getRequestFull('/api/FeedSummaries/GetSurveyFeedSummaries?feedItemId=' + feedItemId);
    }

    public getObservationFeedSummaries(feedItemId: number): Observable<any> {
        return this.getRequestFull('/api/FeedSummaries/GetObservationFeedSummaries?feedItemId=' + feedItemId);
    }

    public getLeaderBoard(startDate: string = null, endDate: string = null) {
        var requestUrl = '/api/Leaderboard/GetLeaderBoard';
        if (startDate || endDate) {
            requestUrl = requestUrl + '?'
                + (startDate ? 'startDate=' + DateEx.formatDate(startDate) : '')
                + (startDate && endDate ? '&' : '')
                + (endDate ? 'endDate=' + DateEx.formatDate(endDate) : '');
        }
        return this.getRequestBase(requestUrl);
    }

    public getUserPointsHistory(userId: number, startDate: string = null, endDate: string = null) {
        var requestUrl = '/api/Leaderboard/GetUserPointsHistory?userId=' + userId
                + (startDate ? '&startDate=' + DateEx.formatDate(startDate) : '')
                + (endDate ? '&endDate=' + DateEx.formatDate(endDate) : '');
        return this.getRequestBase(requestUrl);
    }
}