import { Observable } from 'rxjs/Observable';
import { ApiResponse } from "../../models/apiresponse";
import {TermsAndCondition} from "../../models/competitionclasses";
import { IDeleteModelDataService } from './IDeleteModelDataService';

export interface ITermsAndConditionsDataService extends IDeleteModelDataService {
	getTermsAndConditions(): Observable<TermsAndCondition[]>;
	updateTermsAndCondition(termsAndCondition: TermsAndCondition): Observable<ApiResponse>;
}
