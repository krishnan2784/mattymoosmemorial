import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { RequestHelper } from "./helpers/requesthelper";
import Enums = require("../enums");
import Apiresponse = require("../models/apiresponse");
import MarketContentService = require("../interfaces/services/IMarketContentService");
import IMarketContentService = MarketContentService.IMarketContentService;
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
import {IBrandingService} from "../interfaces/services/IBrandingService";
import {BaseBrandingConfiguration, BrandingElement } from "../models/brandingclasses";

@Injectable()
export class BrandingService extends RequestHelper implements IBrandingService, IMarketContentService {

    constructor(public http: Http) {
        super(http);
    }

	public getBranding(): Observable<{brandingConfigurations: BaseBrandingConfiguration[], brandingOptions: any}> {
      return this.getRequestBase('/api/Branding/Get');
    }

	public updateBranding(brandingElements: BrandingElement[]): Observable<BrandingElement[]> {
		return this.postRequestBase('/api/Branding/Update', brandingElements);
	}

    public copyItemToMarket(id: number, marketIds: number[]): Observable<Apiresponse.ApiResponse> {
      return this.copyToMarket('/api/Branding/CopyFeedItemToMarket', id, marketIds);
    }

    public publishContentToLive(contentId: number) {
        return this.publishToLive(CopiedElementTypeEnum.Feed, contentId);
    }

}