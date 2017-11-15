import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { RequestHelper } from "./helpers/requesthelper";
import {ICompetitionsDataService} from "../interfaces/services/ICompetitionsDataService";
import {BaseModel} from "../models/baseclasses";

@Injectable()
export class CompetitionsDataService extends RequestHelper implements ICompetitionsDataService {

    constructor(public http: Http) {
        super(http);
    }

	public getCompetitions(): Observable<any> {
        return this.getRequestBase('/api/Competition');
    }

}