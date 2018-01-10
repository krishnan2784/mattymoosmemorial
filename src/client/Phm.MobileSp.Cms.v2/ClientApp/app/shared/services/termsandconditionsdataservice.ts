import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { RequestHelper } from "./helpers/requesthelper";
import {ITermsAndConditionsDataService} from "../../contracts/services/ITermsAndConditionsDataService";
import {AlertService} from "./helpers/alertservice";
import {TermsAndCondition} from "../../models/competitionclasses";
import {ApiResponse} from "../../models/apiresponse";


@Injectable()
export class TermsAndConditionsDataService extends RequestHelper implements ITermsAndConditionsDataService {
  constructor(public http: Http, public alertService: AlertService) {
        super(http, alertService);
    }

	public getTermsAndConditions(): Observable<TermsAndCondition[]> {
		return this.getRequestBase('/api/TermsAndConditions');
	}

	public updateTermsAndCondition(termsAndConditions: TermsAndCondition): Observable<ApiResponse> {
		return this.postRequestFull('/api/TermsAndConditions', termsAndConditions);
	}

	public deleteItem(id: number): Observable<boolean> {
		return this.postRequestBase('/api/TermsAndConditions/Delete?id=' + id, null);
	}

}
