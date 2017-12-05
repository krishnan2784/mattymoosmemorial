import { Component, Input, Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { ResponseHelper } from "./helpers/responsehelper";
import Marketclasses = require("../models/marketclasses");
import Market = Marketclasses.Market;
import Enums = require("../enums");
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
import Requesthelper = require("./helpers/requesthelper");
import RequestHelper = Requesthelper.RequestHelper;
import {IMarketContentService} from "../interfaces/services/IMarketContentService";
import {ApiResponse} from "../models/apiresponse";

declare var Materialize: any;

@Injectable()
export class MarketContentDataService extends RequestHelper implements IMarketContentService {
	contentType: CopiedElementTypeEnum;
	baseUrl: string;

	constructor(public http: Http, contentType: CopiedElementTypeEnum, baseUrl: string,
		public getMarketsByContentIdUrl: string = '/GetMarketsById',
		public copyContentToMarketUrl: string = '/CopyToMarket') {
        super(http);
	    this.contentType = contentType;
		this.baseUrl = '/api/' + baseUrl;
		this.getMarketsByContentIdUrl = this.baseUrl + getMarketsByContentIdUrl;
		this.copyContentToMarketUrl = this.baseUrl + copyContentToMarketUrl;
	}

	public getMarketsByContentId(contentId) {
		let url = this.getMarketsByContentIdUrl + '?contentId=' + contentId;
		return this.getRequestBase(url);
	}

	public copyContentToMarket(id: number, marketIds: number[]): Observable<ApiResponse> {
		if (!marketIds || marketIds.length === 0)
			return null;
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let marketQueryString = '';
		for (let m of marketIds) {
			marketQueryString += '&marketIds=' + m;
		}
		return Observable.create(observer => {
			this.http.post(this.copyContentToMarketUrl + '?id=' + id + marketQueryString, null, headers).subscribe(
				(result) => {
					let response = ResponseHelper.getResponse(result);
					if (response.success) {
						Materialize.toast(response.message, 5000, 'green');
					} else {
						Materialize.toast(response.message, 5000, 'red');
					}
					observer.next(response);
					observer.complete();
				}
			);
		});
	}

	public publishContentToLive(contentId: number) {
		let headers = new Headers({ 'Content-Type': 'application/json' });
		let url = this.baseUrl + "/PublishContentToLive";
		return Observable.create(observer => {
			this.http.post(url + '?contentId=' + contentId, null, headers).subscribe(
				(result) => {
					let response = ResponseHelper.getResponse(result);
					if (response.success) {
						Materialize.toast(response.message, 5000, 'green');
					} else {
						Materialize.toast(response.message, 5000, 'red');
					}
					observer.next(response);
					observer.complete();
				}
			);
		});
	}
}