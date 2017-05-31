import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { IFeedDataService } from "../interfaces/dataservices/IfeedDataService";
import { RequestHelper } from "./helpers/requesthelper";

import Enums = require("../enums");
import FeedModel = require("../interfaces/models/IFeedModel");
import FeedItem = FeedModel.IFeedItem;
import Feedclasses = require("../models/feedclasses");
import Apiresponse = require("../models/apiresponse");

@Injectable()
export class FeedDataService extends RequestHelper implements IFeedDataService {

    constructor(public http: Http) {
        super(http);
    }

    public getFeeditems(): Observable<FeedModel.IFeedItem[]> {
        return this.getRequestBase('/api/Feed/GetFeedItems');
    }

    public getFeeditemsByCat(selectedCat: Enums.FeedCategoryEnum): Observable<FeedItem[]> {
        return Observable.create(observer => {
            this.getFeeditems().subscribe((result) => {
                if (result.length) {
                    let response = result.filter(x => x.feedCategory === selectedCat);
                    observer.next(response);
                }
                observer.complete();
            });
        });
    }

    public getFeeditemsByType(selectedType: Enums.FeedTypeEnum): Observable<FeedItem[]> {
        return Observable.create(observer => {
            this.getFeeditems().subscribe((result) => {
                if (result.length) {
                    let response = result.filter(x => x.feedType === selectedType);
                    observer.next(response);
                }
                observer.complete();
            });
        });
    }

    public getFeeditem<TFeedItem extends Feedclasses.BaseFeed>(feedId: number, feedItemType: { new ({}): TFeedItem; }): Observable<FeedItem[]>  {
        return Observable.create(observer => {
            this.getRequestBase('/api/Feed/GetFeedItem', [{ key:'id', value:feedId }]).subscribe((result) => {
                let feedItem = new feedItemType(result.content);
                observer.next(feedItem);
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

    public copyFeedItemToMarket(feedItem: FeedItem, marketIds: number[]): Observable<Apiresponse.ApiResponse> {
        return this.postRequestFull('/api/Feed/CopyFeedItemToMarket', { feedItemId : feedItem.id, marketIds});
    }
    
}