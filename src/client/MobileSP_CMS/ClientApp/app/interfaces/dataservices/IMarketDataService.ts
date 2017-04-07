import {Observable} from 'rxjs/Observable';

export interface IMarketDataService {
    updateCurrentMarketId(marketId: number): Observable<boolean>;
    getCurrentMarketId(): Observable<number>;
}