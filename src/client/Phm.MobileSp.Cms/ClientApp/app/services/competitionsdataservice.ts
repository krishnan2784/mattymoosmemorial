import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { RequestHelper } from "./helpers/requesthelper";
import {ICompetitionsDataService} from "../interfaces/services/ICompetitionsDataService";
import {Competition} from "../models/competitionclasses";
import {ApiResponse} from "../models/apiresponse";
import {IMarketContentService} from "../interfaces/services/IMarketContentService";
import * as Apiresponse from "../models/apiresponse";
import {CopiedElementTypeEnum} from "../enums";

@Injectable()
export class CompetitionsDataService extends RequestHelper implements ICompetitionsDataService, IMarketContentService {

	constructor(public http: Http) {
        super(http);
    }

	public getCompetitions(): Observable<Competition[]> {
        return this.getRequestBase('/api/Competition');
	}

	public updateCompetition(competition: Competition): Observable<ApiResponse> {
		return this.postRequestFull('/api/Competition', competition);
	}

	public deleteCompetition(id: number): Observable<boolean> {
		return this.postRequestBase('/api/Competition/Delete?id=' + id, null);
	}

	public copyItemToMarket(id: number, marketIds: number[]): Observable<ApiResponse> {
		return this.copyToMarket('/api/Competition/CopyToMarket', id, marketIds, CopiedElementTypeEnum.Competition);
	}

	public publishContentToLive(contentId: number) {
		return this.publishToLive(CopiedElementTypeEnum.Competition, contentId);
	}
}