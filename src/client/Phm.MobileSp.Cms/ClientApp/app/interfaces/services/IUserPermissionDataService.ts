import {Observable} from 'rxjs/Observable';
import {SecUserFeaturePermission} from "../../models/securityclasses";

export interface IUserPermissionDataService {
	getUsersFeaturePermission(userId: number): Observable<SecUserFeaturePermission[]>;
}