import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import {MarketContentDataService} from "./marketcontentdataservice ";
import {ICompetitionsDataService} from "../../contracts/services/ICompetitionsDataService";
import {IMarketContentService} from "../../contracts/services/IMarketContentService";
import {AlertService} from "./helpers/alertservice";
import {CopiedElementTypeEnum} from "../../../enums";
import {Competition} from "../../models/competitionclasses";
import {ApiResponse} from "../../models/apiresponse";


@Injectable()
export class CompetitionsDataService extends MarketContentDataService implements ICompetitionsDataService, IMarketContentService {

  constructor(public http: Http, public alertService: AlertService) {
		super(http, alertService, CopiedElementTypeEnum.Competition, 'Competition');
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

}
