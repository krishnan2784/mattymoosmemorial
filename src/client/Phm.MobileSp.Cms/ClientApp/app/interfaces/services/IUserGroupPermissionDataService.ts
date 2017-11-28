import {Observable} from 'rxjs/Observable';
import {SecUserFeaturePermission, SecGroup } from "../../models/securityclasses";
import {User} from "../../models/userclasses";

export interface IUserGroupPermissionDataService {
	getUserGroupsByMarketMasterId(masterId: string): Observable<SecGroup[]>;
	getUserGroupsFeaturePermission(userGroupId: number): Observable<SecUserFeaturePermission[]>;
	getSecurityGroupUsers(userGroupId: number): Observable<User[]>;
}