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
import MarketContentService = require("../interfaces/services/IMarketContentService");
import { DateEx } from "../classes/helpers/date";
import IMarketContentService = MarketContentService.IMarketContentService;
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;

@Injectable()
export class FeedDataService extends RequestHelper implements IFeedDataService, IMarketContentService {

    constructor(public http: Http) {
        super(http);
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
                observer.next(result);
                observer.complete();
            });
        });
    }

    public updateFeeditem(updateUrl: string, feedItem: FeedItem): Observable<Apiresponse.ApiResponse> {
        return this.postRequestFull(updateUrl, feedItem);
    }

    public deleteFeeditem(feedItemId: number): Observable<boolean> {
        return this.postRequestBase('/api/Feed/DeleteFeedItem',  feedItemId);
    }
    public copyItemToMarket(id: number, marketIds: number[]): Observable<Apiresponse.ApiResponse> {
        return this.copyToMarket('/api/Feed/CopyFeedItemToMarket', id, marketIds);
    }

    public publishContentToLive(contentId: number) {
        return this.publishToLive(CopiedElementTypeEnum.Feed, contentId);
    }

    public getQuizFeedItemReport(feedItemId: number): Observable<any> {
        return this.getRequestFull('/api/Feed/GetQuizFeedSummaries?feedItemId=' + feedItemId);
    }

    public getFeedItemResultList(feedItemId: number, lowerBoundary: number, higherBoundary: number, userGroupId: number) {
        var requestUrl = '/api/Feed/GetQuizResultsSummariesEX?feedItemId=' + feedItemId
            + '&lowerBoundary=' + lowerBoundary
            + '&higherBoundary=' + higherBoundary
            + '&userGroupId=' + userGroupId;
        return this.getRequestFull(requestUrl);
    }

    public getSurveyFeedSummaries(feedItemId: number): Observable<any> {
        return this.getRequestFull('/api/Feed/GetSurveyFeedSummaries?feedItemId=' + feedItemId);
    }

    public getObservationFeedSummaries(feedItemId: number): Observable<any> {
        return this.getRequestFull('/api/Feed/GetObservationFeedSummaries?feedItemId=' + feedItemId);
    }

    public getLeaderBoard(startDate: string = null, endDate: string = null) {
        var requestUrl = '/api/Feed/GetLeaderBoard';
        console.log(startDate, endDate);
        if (startDate || endDate) {
            requestUrl = requestUrl + '?'
                + (startDate ? 'startDate=' + DateEx.formatDate(startDate) : '')
                + (startDate && endDate ? '&' : '')
                + (endDate ? 'endDate=' + DateEx.formatDate(endDate) : '');
        }
        return this.getRequestBase(requestUrl);
    }

    public getUserPointsHistory(userId: number, startDate: string = null, endDate: string = null) {
        var requestUrl = '/api/Feed/GetUserPointsHistory?userId=' + userId
                + (startDate ? '&startDate=' + startDate : '')
                + (endDate ? '&endDate=' + endDate : '');
        return this.getRequestBase(requestUrl);
    }
}