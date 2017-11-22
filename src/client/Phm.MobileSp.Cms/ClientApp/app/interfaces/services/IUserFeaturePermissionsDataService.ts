import { Observable } from 'rxjs/Observable';
import { ApiResponse } from "../../models/apiresponse";
import {TermsAndCondition} from "../../models/competitionclasses";
import {SecFeaturePermission} from "../../models/securityclasses";

export interface IUserFeaturePermissionsDataService {
	updateEntityPermissions(secEntityPermissions: SecFeaturePermission[]): Observable<ApiResponse>;
	deleteEntityPermissions(id: number): Observable<boolean>;
}