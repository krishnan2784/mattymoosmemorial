import { Injectable, Inject } from "@angular/core";
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/publishReplay";
import {RequestHelper} from "./helpers/requesthelper";
import {IFeedDataService} from "../../contracts/services/IFeedDataService";
import {IMarketContentService} from "../../contracts/services/IMarketContentService";
import {IFeedItem} from "../../contracts/models/IFeedModel";
import {ApiResponse} from "../../models/apiresponse";
import {CopiedElementTypeEnum, FeedCategoryEnum, FeedTypeEnum } from "../../../enums";
import {DateEx} from "../../classes/helpers/date";
import {ORIGIN_URL} from "../constants/baseurl.constants";
import {AlertService} from "./helpers/alertservice";


@Injectable()
export class FeedDataService extends RequestHelper implements IFeedDataService, IMarketContentService {

  constructor(public http: Http, @Inject(ORIGIN_URL) baseUrl: string, alertService: AlertService) {
    super(http, baseUrl, alertService);
    }

    public getFeeditems(): Observable<IFeedItem[]> {
        return this.getRequestBase(`${this.baseUrl}/api/Feed/GetFeedItems`);
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

    public getFeeditem(feedId: number): Observable<IFeedItem>  {
        return Observable.create(observer => {
            this.getRequestBase(`${this.baseUrl}/api/Feed/GetFeedItem?id=${feedId}`).subscribe((result) => {
                observer.next(result);
                observer.complete();
            });
        });
    }

    public updateFeeditem(updateUrl: string, feedItem: IFeedItem): Observable<ApiResponse> {
        return this.postRequestFull(`${this.baseUrl}/api/Feed/UpdateFeedItem`, feedItem);
    }

    public deleteFeeditem(feedItemId: number): Observable<boolean> {
        return this.postRequestBase(`${this.baseUrl}/api/Feed/DeleteFeedItem`,  feedItemId);
    }

    public copyItemToMarket(id: number, marketIds: number[]): Observable<ApiResponse> {
        return this.copyToMarket(`${this.baseUrl}/api/Feed/CopyFeedItemToMarket`, id, marketIds);
    }

    public publishContentToLive(contentId: number) {
        return this.publishToLive(CopiedElementTypeEnum.Feed, contentId);
    }

    public getQuizFeedItemReport(feedItemId: number): Observable<any> {
        return this.getRequestFull(`${this.baseUrl}/api/FeedSummaries/GetQuizFeedSummaries?feedItemId=${feedItemId}`);
    }

    public getFeedItemResultList(feedItemId: number, lowerBoundary: number, higherBoundary: number, userGroupId: number) {
      var requestUrl = `${this.baseUrl}/api/FeedSummaries/GetQuizResultsSummariesEX?feedItemId=${feedItemId}
            &lowerBoundary=${lowerBoundary}
            &higherBoundary=${higherBoundary}
            &userGroupId=${userGroupId}`;
        return this.getRequestFull(requestUrl);
    }

    public getSurveyFeedSummaries(feedItemId: number): Observable<any> {
      return this.getRequestFull(`${this.baseUrl}/api/FeedSummaries/GetSurveyFeedSummaries?feedItemId=${feedItemId}`);
    }

    public getObservationFeedSummaries(feedItemId: number): Observable<any> {
      return this.getRequestFull(`${this.baseUrl}/api/FeedSummaries/GetObservationFeedSummaries?feedItemId=${feedItemId}`);
    }

    public getLeaderBoard(startDate: string = null, endDate: string = null) {
      var requestUrl = `${this.baseUrl}/api/Leaderboard/GetLeaderBoard`;
        if (startDate || endDate) {
            requestUrl = requestUrl + "?"
                + (startDate ? "startDate=" + DateEx.formatDate(startDate) : "")
                + (startDate && endDate ? "&" : "")
                + (endDate ? "endDate=" + DateEx.formatDate(endDate) : "");
        }
        return this.getRequestBase(requestUrl);
    }

    public getUserPointsHistory(userId: number, startDate: string = null, endDate: string = null) {
      var requestUrl = `${this.baseUrl}/api/Leaderboard/GetUserPointsHistory?userId=${userId}
                ${startDate ? `&startDate=${startDate}` : ""}
                ${endDate ? `&endDate=${endDate}` : ""}`;
        return this.getRequestBase(requestUrl);
    }
}
