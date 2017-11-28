import {Observable} from 'rxjs/Observable';
import { SecFeaturePermission } from "../../models/securityclasses";

export interface IEntityPermissionDataService {
	getEntityPermissions(entityId: number): Observable<SecFeaturePermission[]>;
	getUserPermissions(id: number): Observable<{ permissions: SecFeaturePermission[], secEntityId: number }>;
}