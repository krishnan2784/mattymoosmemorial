﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { RequestHelper } from "./helpers/requesthelper";
import {Competition, BaseRewardScheme } from "../models/competitionclasses";
import {ApiResponse} from "../models/apiresponse";
import {IRewardSchemesDataService} from "../interfaces/services/IRewardSchemesDataService";

@Injectable()
export class RewardSchemesDataService extends RequestHelper implements IRewardSchemesDataService {

    constructor(public http: Http) {
        super(http);
    }

	public getRewardScheme(): Observable<BaseRewardScheme[]> {
		return this.getRequestBase('/api/RewardSchemes');
	}

	public updateRewardScheme(rewardScheme: BaseRewardScheme): Observable<ApiResponse> {
		return this.postRequestFull('/api/RewardSchemes', rewardScheme);
	}

	public deleteRewardScheme(id: number): Observable<boolean> {
		return this.postRequestBase('/api/RewardSchemes/Delete?id=' + id, null);
	};
}