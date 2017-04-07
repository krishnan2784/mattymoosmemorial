import {Observable} from 'rxjs/Observable';
import Userclasses = require("../../models/userclasses");

export interface IMarketDataService {
    updateCurrentMarketUd(marketId: number): Observable<boolean>;
    getCurrentMarketId(): Observable<number>;
}