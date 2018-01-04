import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import {RequestHelper} from "./helpers/requesthelper";
import {ICompetitionSubsetsDataService} from "../../contracts/services/ICompetitionSubsetsDataService";
import {AlertService} from "./helpers/alertservice";
import {CompetitionSubset} from "../../models/competitionclasses";

@Injectable()
export class CompetitionSubsetsDataService extends RequestHelper implements ICompetitionSubsetsDataService {

  constructor(public http: Http, public alertService: AlertService) {
        super(http, alertService);
    }

	public getCompetitionSubsets(): Observable<CompetitionSubset[]> {
        return this.getRequestBase('/api/CompetitionSubset');
	}
}
