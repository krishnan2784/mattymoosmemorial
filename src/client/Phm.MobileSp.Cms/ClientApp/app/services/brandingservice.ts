import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { IFeedDataService } from "../interfaces/services/IFeedDataService";
import { RequestHelper } from "./helpers/requesthelper";

import Enums = require("../enums");
import Apiresponse = require("../models/apiresponse");
import MarketContentService = require("../interfaces/services/IMarketContentService");
import IMarketContentService = MarketContentService.IMarketContentService;
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
import {IBrandingService} from "../interfaces/services/IBrandingService";

@Injectable()
export class BrandingService extends RequestHelper implements IBrandingService, IMarketContentService {

    constructor(public http: Http) {
        super(http);
    }

    public getBrandBranding(brandId: number): Observable<any> {
      return this.getRequestBase('/api/Branding/GetBrandingByBrand/' + brandId);
    }

    public getMarketBranding(marketId: number): Observable<any> {
      return this.getRequestBase('/api/Branding/GetBrandingByMarket/' + marketId);
    }
  
    public copyItemToMarket(id: number, marketIds: number[]): Observable<Apiresponse.ApiResponse> {
      return this.copyToMarket('/api/Branding/CopyFeedItemToMarket', id, marketIds);
    }

    public publishContentToLive(contentId: number) {
        return this.publishToLive(CopiedElementTypeEnum.Feed, contentId);
    }

}