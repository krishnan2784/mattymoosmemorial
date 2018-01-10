import {Observable} from 'rxjs/Observable';
import {BaseRewardScheme } from "../../models/competitionclasses";
import {ApiResponse} from "../../models/apiresponse";
import {IDeleteModelDataService} from "./IDeleteModelDataService";

export interface IRewardSchemesDataService extends IDeleteModelDataService {
	getRewardScheme(): Observable<BaseRewardScheme[]>;
	updateRewardScheme(rewardScheme: BaseRewardScheme): Observable<ApiResponse>;
}
