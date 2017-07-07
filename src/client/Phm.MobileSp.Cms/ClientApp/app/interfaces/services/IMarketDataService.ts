import {Observable} from 'rxjs/Observable';
import Enums = require("../../enums");
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
import Marketclasses = require("../../models/marketclasses");
import Market = Marketclasses.Market;

export interface IMarketDataService {
    updateCurrentMarketId(marketId: number): Observable<boolean>;
    getCurrentMarketId(): Observable<number>;
    getMarketsByMasterId(contentType: CopiedElementTypeEnum, masterId: string): Observable<Market[]>;
    getMarketUserFilters(): Observable<{ userGroupNames: string[], dealershipNames: string[], regions: string[], zones: string[]}>;

}