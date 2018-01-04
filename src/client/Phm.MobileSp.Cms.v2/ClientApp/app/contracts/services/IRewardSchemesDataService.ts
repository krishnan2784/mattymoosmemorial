import {Observable} from 'rxjs/Observable';
import {BaseRewardScheme } from "../../models/competitionclasses";
import {ApiResponse} from "../../models/apiresponse";

export interface IRewardSchemesDataService {
	getRewardScheme(): Observable<BaseRewardScheme[]>;
	updateRewardScheme(rewardScheme: BaseRewardScheme): Observable<ApiResponse>;
	deleteRewardScheme(id: number): Observable<boolean>;
}