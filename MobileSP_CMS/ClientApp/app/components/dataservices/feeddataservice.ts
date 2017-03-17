import { Component, Input} from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { IFeedDataService } from "./interfaces/IfeedDataService";
import * as Feedinterfaces from "../models/interfaces/feedinterfaces";
import * as Feedclasses from "../models/feedclasses";
import * as Enums from "../enums";


@Component({
    template: ''
})
export class FeedDataService implements IFeedDataService {
    private http: Http;
    private feedItemsObservable: Observable<Feedinterfaces.IFeedItem[]>;
    public feedItems: Feedinterfaces.IFeedItem[]=[];

    constructor(http: Http) {
        this.http = http;
        var observable = this.refreshFeeditems();
        observable.subscribe((data) => {
            this.feedItems = data;
        });
    }

    public getFeedItems(feedCategory: Enums.FeedCategoryEnum): Observable<Feedinterfaces.IFeedItem[]> {
        return Observable.create(this.feedItems.filter(x => x.feedCategory === feedCategory));
    };

    public getFeeditem<TFeedItem extends Feedclasses.BaseFeed>(id: number, feedItemType: { new ({}): TFeedItem; }): Observable<Feedinterfaces.IFeedItem> {

        let feedItem = this.feedItems.filter(x => x.id == id)[0];
        if (feedItem != null) {
            return Observable.create(observer => {
                let item = new feedItemType(feedItem);
                observer.next(item);
                observer.complete();
            });
        }
        return Observable.create(observer => {
            let item = new feedItemType({});
            observer.next(item);
            observer.complete();
        });

    }

    public refreshFeeditems() {
        return Observable.create(observer => {
            this.http.get('/api/Feed/GetFeedItems').subscribe(result => {
                this.feedItems = result.json();
                observer.next(this.feedItems);
                observer.complete();
            });
        });
    }

    public refreshFeeditem<TFeedItem extends Feedclasses.BaseFeed>(id: number, feedItemType: { new ({}): TFeedItem; }): Feedinterfaces.IFeedItem  {
        this.http.get('/api/Feed/GetFeedItem?id=' + id).subscribe(result => {
            let feedItem = new feedItemType(result.json());
            this.feedItems.push(feedItem);
            return feedItem;
        });
        return new feedItemType({});
    }

    public updateFeeditem(feedItem: Feedinterfaces.IFeedItem, updateUrl: string): Observable<boolean> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify(feedItem);
        return Observable.create(observer => {
            this.http.post(updateUrl, body, { headers: headers }).subscribe(
                (result) => {
                    var currentIndex = this.feedItems.indexOf(this.feedItems.filter(x => x.id == feedItem.id)[0]) || 0;
                    feedItem = result.json();

                    if (currentIndex> 0) {
                        this.feedItems.splice(currentIndex, 1, feedItem);
                    } else {
                        this.feedItems.unshift(feedItem);
                    }

                    observer.next(true);
                    observer.complete();
                },
                err => {
                    console.log(err);
                    observer.next(false);
                    observer.complete();
                }
            );
        });

    }

    public deleteFeeditem(feedItem: Feedinterfaces.IFeedItem) : boolean {
        this.http.get('/api/Feed/DeleteFeedItem?id=' + feedItem.id).subscribe(result => {
            var index = this.feedItems.indexOf(feedItem);
            if (index > -1) {
                this.feedItems.splice(index, 1);
            }
            return true;
        });
        return false;
    }

}