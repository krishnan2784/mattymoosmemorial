import {Observable} from 'rxjs/Observable';

export interface IBrandingService {
  getBrandBranding(brandId: number): Observable<any>;
  getMarketBranding(marketId: number): Observable<any>;
}