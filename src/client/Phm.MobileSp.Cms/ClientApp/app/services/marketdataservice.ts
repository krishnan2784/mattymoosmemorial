import { Component, Input, Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { IMarketDataService } from "../interfaces/services/IMarketDataService";
import { ResponseHelper } from "./helpers/responsehelper";
import Marketclasses = require("../models/marketclasses");
import Market = Marketclasses.Market;
import Enums = require("../enums");
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
import Requesthelper = require("./helpers/requesthelper");
import RequestHelper = Requesthelper.RequestHelper;

@Injectable()
export class MarketDataService extends RequestHelper implements IMarketDataService {

    constructor(public http: Http) {
        super(http);
    }

    updateCurrentMarketId(marketId: number): Observable<boolean> {
        return Observable.create(observer => {
            this.http.get('/api/Market/ChangeMarket?marketId=' + marketId).subscribe(result => {
                let response = ResponseHelper.getResponse(result);
                observer.next(response.success);
                observer.complete();
            });
        });
    }

    getCurrentMarketId(): Observable<number> {
        return Observable.create(observer => {
            this.http.get('/api/Market/GetCurrentMarket').subscribe(result => {
                let response = ResponseHelper.getResponse(result);
                observer.next(response.content);
                observer.complete();
            });
        });
    }

    getMarketsByMasterId(contentType: CopiedElementTypeEnum, masterId: string): Observable<Market[]> {
        return Observable.create(observer => {
            this.getRequestBase('/api/Market/GetMarketsByMasterId?contentType=' + contentType
                + '&masterId=' + masterId).subscribe((result) => {
                    observer.next(result);
                    observer.complete();
                });
        });
    }

    getMarketUserFilters(): Observable<{
        userGroupNames: string[], dealershipNames: string[], dealershipCodes: string[],
        regions: string[], zones: string[], areas: string[]
    }> {
        return Observable.create(observer => {
            this.getRequestBase('/api/Market/GetMarketUserFilters').subscribe((result) => {
                if (result) {
                    let response = {
                        userGroupNames: result.userGroupNames,
                        dealershipNames: result.dealershipNames,
                        dealershipCodes: result.dealershipCodes,
                        regions: result.regions,
                        zones: result.zones,
                        areas: result.areas
                    };
                    observer.next(response);
                }
                observer.complete();
            });
        });
    }
}