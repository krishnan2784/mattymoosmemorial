import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import {MarketContentDataService} from "./marketcontentdataservice ";
import {IFeedDataService} from "../../contracts/services/IFeedDataService";
import {IMarketContentService} from "../../contracts/services/IMarketContentService";
import {CopiedElementTypeEnum, FeedCategoryEnum, FeedTypeEnum } from "../../../enums";
import {DateEx} from "../../classes/helpers/date";
import {AlertService} from "./helpers/alertservice";
import {IFeedItem} from "../../contracts/models/IFeedModel";
import {ApiResponse} from "../../models/apiresponse";


@Injectable()
export class FeedDataService extends MarketContentDataService implements IFeedDataService, IMarketContentService {

  constructor(public http: Http, public alertService: AlertService) {
    super(http, alertService, CopiedElementTypeEnum.Feed, 'Feed', '/GetMarketsByMasterId', '/CopyFeedItemToMarket');
  }

  public getFeeditems(): Observable<IFeedItem[]> {
    return this.getRequestBase('/api/Feed/GetFeedItems');
  }

  public getFeeditemsByCat(selectedCat: FeedCategoryEnum): Observable<IFeedItem[]> {
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

  public getFeeditemsByType(selectedType: FeedTypeEnum): Observable<IFeedItem[]> {
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

  public getFeeditem(feedId: number): Observable<IFeedItem> {
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

  public updateFeeditem(updateUrl: string, feedItem: IFeedItem): Observable<ApiResponse> {
    return this.postRequestFull('/api/Feed/UpdateFeedItem', feedItem);
  }

  public deleteFeeditem(feedItemId: number): Observable<boolean> {
    return this.postRequestBase('/api/Feed/DeleteFeedItem', feedItemId);
  }

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
