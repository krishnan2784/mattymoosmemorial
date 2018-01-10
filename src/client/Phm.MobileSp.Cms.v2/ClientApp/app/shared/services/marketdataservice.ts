import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {RequestHelper} from "./helpers/requesthelper";
import {IMarketDataService} from "../../contracts/services/IMarketDataService";
import {ResponseHelper} from "./helpers/responsehelper";
import {CopiedElementTypeEnum} from "../../../enums";
import {Market} from "../../models/marketclasses";
import { Observable } from 'rxjs/Observable';
import {AlertService} from "./helpers/alertservice";


@Injectable()
export class MarketDataService extends RequestHelper implements IMarketDataService {

  constructor(public http: Http, public alertService: AlertService) {
    super(http, alertService);
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
      this.http.get('/api/Market/GetCurrentMarketId').subscribe(result => {
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
    regions: string[], zones: string[], areas: string[]}> {
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
