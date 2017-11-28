import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { RequestHelper } from "./helpers/requesthelper";
import {CompetitionSubset} from "../models/competitionclasses";
import {ApiResponse} from "../models/apiresponse";
import {ICompetitionSubsetsDataService} from "../interfaces/services/ICompetitionSubsetsDataService";

@Injectable()
export class CompetitionSubsetsDataService extends RequestHelper implements ICompetitionSubsetsDataService {

	constructor(public http: Http) {
        super(http);
    }

	public getCompetitionSubsets(): Observable<CompetitionSubset[]> {
        return this.getRequestBase('/api/CompetitionSubset');
	}
}