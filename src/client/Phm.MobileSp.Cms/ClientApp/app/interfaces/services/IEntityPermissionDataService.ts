import {Observable} from 'rxjs/Observable';
import { SecFeaturePermission } from "../../models/securityclasses";

export interface IEntityPermissionDataService {
	getEntityPermissions(entityId: number): Observable<SecFeaturePermission[]>;
}