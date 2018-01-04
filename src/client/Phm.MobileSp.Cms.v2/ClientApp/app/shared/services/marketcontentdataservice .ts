import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { ResponseHelper } from "./helpers/responsehelper";
import {RequestHelper} from "./helpers/requesthelper";
import {IMarketContentService} from "../../contracts/services/IMarketContentService";
import {CopiedElementTypeEnum} from "../../../enums";
import {ApiResponse} from "../../models/apiresponse";
import {AlertService} from "./helpers/alertservice";

@Injectable()
export class MarketContentDataService extends RequestHelper implements IMarketContentService {
	contentType: CopiedElementTypeEnum;
	baseUrl: string;

  constructor(public http: Http, public alertService: AlertService, contentType: CopiedElementTypeEnum, baseUrl: string,
		public getMarketsByContentIdUrl: string = '/GetMarketsById',
    public copyContentToMarketUrl: string = '/CopyToMarket')
  {
    super(http, alertService);
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
			this.http.post(this.copyContentToMarketUrl + '?id=' + id + marketQueryString, headers).subscribe(
				(result) => {
          let response = ResponseHelper.getResponse(result);

          this.alertService.displaySuccessFailAlert(response.message, response.success);

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
			this.http.post(url + '?contentId=' + contentId, headers).subscribe(
				(result) => {
					let response = ResponseHelper.getResponse(result);

          this.alertService.displaySuccessFailAlert(response.message, response.success);

					observer.next(response);
					observer.complete();
				}
			);
		});
	}
}
