import { Observable } from 'rxjs/Observable';
import { ApiResponse } from "../../models/apiresponse";
import {TermsAndCondition} from "../../models/competitionclasses";

export interface ITermsAndConditionsDataService {
	getTermsAndConditions(): Observable<TermsAndCondition[]>;
	updateTermsAndCondition(termsAndCondition: TermsAndCondition): Observable<ApiResponse>;
	deleteTermsAndCondition(id: number): Observable<boolean>;
}