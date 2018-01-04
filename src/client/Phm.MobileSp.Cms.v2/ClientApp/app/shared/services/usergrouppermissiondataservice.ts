import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import {RequestHelper} from "./helpers/requesthelper";
import {IUserGroupPermissionDataService} from "../../contracts/services/IUserGroupPermissionDataService";
import {SecGroup, SecUserFeaturePermission } from "../../models/securityclasses";
import {ResponseHelper} from "./helpers/responsehelper";
import {User} from "../../models/userclasses";
import {AlertService} from "./helpers/alertservice";

@Injectable()
export class UserGroupPermissionDataService extends RequestHelper implements IUserGroupPermissionDataService {

  constructor(public http: Http, private zone: NgZone, public alertService: AlertService) {
        super(http, alertService);
    }

	public getUserGroupsByMarketMasterId(masterId: string): Observable<SecGroup[]> {
		return this.getRequestBase('/api/AccountManagement/GetSecGroups');
    }

	public getUserGroupsFeaturePermission(userGroupId: number): Observable<SecUserFeaturePermission[]> {
		return Observable.create(observer => {
			this.http.get('/api/SecurityFeaturePermission/GetUserGroupPermissions/' + userGroupId).subscribe(result => {
				let response = ResponseHelper.getResponse(result);
				observer.next(response.content);
				observer.complete();
			});
		});
	}
	
	public getSecurityGroupUsers(userGroupId: number): Observable<User[]> {
		return Observable.create(observer => {
			this.http.get('/api/SecurityGroup/GetSecGroupUsers/?id=' + userGroupId).subscribe(result => {
				let response = ResponseHelper.getResponse(result);
				observer.next(response.content);
				observer.complete();
			});
		});
	}
	
}
