import { Component, Input, Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { IFeedDataService } from "../interfaces/dataservices/IFeedDataService";
import { IFeedItem } from "../interfaces/models/IFeedModel";
import * as Feedclasses from "../models/feedclasses";
import * as Enums from "../enums";

@Injectable()
export class FeedDataService implements IFeedDataService {

    constructor(public http: Http, private zone: NgZone) {
    }

    public getFeeditems(): Observable<IFeedItem[]> {
        return Observable.create(observer => {
            this.http.get('/api/Feed/GetFeedItems').subscribe(result => {
                let feedItems = result.json();
                observer.next(feedItems);
                observer.complete();
            });
        });
    }

    public getFeeditemsByCat(selectedCat: Enums.FeedCategoryEnum): Observable<IFeedItem[]> {
        return Observable.create(observer => {
            this.http.get('/api/Feed/GetFeedItemsByCat?selectedCategory=' + selectedCat).subscribe(result => {
                let feedItems = result.json();
                observer.next(feedItems);
                observer.complete();
            });
        });
    }

    public getFeeditem<TFeedItem extends Feedclasses.BaseFeed>(id: number, feedItemType: { new ({}): TFeedItem; }): Observable<IFeedItem>  {
        return Observable.create(observer => {
            this.http.get('/api/Feed/GetFeedItem?id=' + id).subscribe(result => {
                let feedItem = new feedItemType(result.json());
                observer.next(feedItem);
                observer.complete();
            });
        });
    }

    public updateFeeditem(updateUrl: string, feedItem: IFeedItem): Observable<{ success: boolean, model: IFeedItem }> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify(feedItem);

        return Observable.create(observer => {
            this.http.post(updateUrl, body, { headers: headers }).subscribe(
                (result) => {
                    var model = result.json();
                    let success = true;
                    observer.next({ success, model });
                    observer.complete();
                },
                err => {
                    console.log(err);
                    let success = false;
                    observer.next({ success});
                    observer.complete();
                }
            );
        });
    }

    public deleteFeeditem(feedItem: IFeedItem) : boolean {
        this.http.get('/api/Feed/DeleteFeedItem?id=' + feedItem.id).subscribe(result => {
            return true;
        });
        return false;
    }
}