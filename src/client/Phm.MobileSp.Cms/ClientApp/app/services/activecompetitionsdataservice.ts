import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { RequestHelper } from "./helpers/requesthelper";
import {ActiveCompetition} from "../models/competitionclasses";
import {ApiResponse} from "../models/apiresponse";
import {IActiveCompetitionsDataService} from "../interfaces/services/IActiveCompetitionsDataService";

@Injectable()
export class ActiveCompetitionsDataService extends RequestHelper implements IActiveCompetitionsDataService {

	constructor(public http: Http) {
        super(http);
    }

	public getActiveCompetitions(): Observable<ActiveCompetition[]> {
        return this.getRequestBase('/api/ActiveCompetition');
	}
}