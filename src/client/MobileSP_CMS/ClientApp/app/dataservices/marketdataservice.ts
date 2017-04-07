import { Component, Input, Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { IMarketDataService } from "../interfaces/dataservices/IMarketDataService";
import { ResponseHelper } from "./helpers/responsehelper";
import Userclasses = require("../models/userclasses");
import { ApiResponse } from "../models/apiresponse";

@Injectable()
export class MarketDataService implements IMarketDataService {

    constructor(public http: Http, private zone: NgZone) {
    }

    updateCurrentMarketUd(marketId: number): Observable<boolean> {
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

}