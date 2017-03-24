import { Component, Input, Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { IFeedDataService } from "../interfaces/dataservices/IfeedDataService";
import { ResponseHelper } from "./helpers/responsehelper";
import Enums = require("../enums");
import FeedModel = require("../interfaces/models/IFeedModel");
import FeedItem = FeedModel.IFeedItem;
import Feedclasses = require("../models/feedclasses");
import Apiresponse = require("../models/apiresponse");

@Injectable()
export class FeedDataService implements IFeedDataService {

    constructor(public http: Http, private zone: NgZone) {
    }

    public getFeeditems(): Observable<FeedModel.IFeedItem[]> {
        return Observable.create(observer => {
            this.http.get('/api/Feed/GetFeedItems').subscribe(result => {
                let response = ResponseHelper.getResponse(result);
                observer.next(response.content);
                observer.complete();
            });
        });
    }

    public getFeeditemsByCat(selectedCat: Enums.FeedCategoryEnum): Observable<FeedItem[]> {
        return Observable.create(observer => {
            this.getFeeditems().subscribe((result) => {
                let response = result.filter(x => x.feedCategory === selectedCat);
                observer.next(response);
                observer.complete();
            });
        });
    }

    public getFeeditem<TFeedItem extends Feedclasses.BaseFeed>(id: number, feedItemType: { new ({}): TFeedItem; }): Observable<FeedItem[]>  {
        return Observable.create(observer => {
            this.http.get('/api/Feed/GetFeedItem?id=' + id).subscribe(result => {
                let response = ResponseHelper.getResponse(result);

                if (response.success === false) {
                    alert(response.message);
                }

                let feedItem = new feedItemType(response.content);
                observer.next(feedItem);
                observer.complete();
            });
        });
    }

    public updateFeeditem(updateUrl: string, feedItem: FeedItem): Observable<Apiresponse.ApiResponse> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify(feedItem);

        return Observable.create(observer => {
            this.http.post(updateUrl, body, { headers: headers }).subscribe(
                (result) => {
                    let response = ResponseHelper.getResponse(result);

                    if (response.success === false) {
                        alert(response.message);
                    }

                    observer.next(response);
                    observer.complete();
                }
            );
        });
    }

    public deleteFeeditem(feedItem: FeedItem) : boolean {
        this.http.get('/api/Feed/DeleteFeedItem?id=' + feedItem.id).subscribe(result => {
            return true;
        });
        return false;
    }
    
}