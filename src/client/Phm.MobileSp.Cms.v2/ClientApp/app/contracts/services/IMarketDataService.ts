import { Observable } from 'rxjs/Observable';
import {CopiedElementTypeEnum} from "../../../enums";import {Market} from "../../models/marketclasses";
export interface IMarketDataService {
    updateCurrentMarketId(marketId: number): Observable<boolean>;
    getCurrentMarketId(): Observable<number>;
    getMarketsByMasterId(contentType: CopiedElementTypeEnum, masterId: string): Observable<Market[]>;
    getMarketUserFilters(): Observable<{
      userGroupNames: string[], dealershipNames: string[], regions: string[],
      zones: string[], areas: string[]}>;

}
