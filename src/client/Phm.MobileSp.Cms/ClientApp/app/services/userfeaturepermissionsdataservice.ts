﻿import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { RequestHelper } from "./helpers/requesthelper";
import {ApiResponse} from "../models/apiresponse";
import {IUserFeaturePermissionsDataService} from "../interfaces/services/IUserFeaturePermissionsDataService";
import {SecFeaturePermission} from "../models/securityclasses";

@Injectable()
export class UserFeaturePermissionsDataService extends RequestHelper implements IUserFeaturePermissionsDataService {
	constructor(public http: Http) {
        super(http);
    }

	updateEntityPermissions(secEntityPermissions: SecFeaturePermission[]): Observable<ApiResponse> {
		return this.postRequestFull('/api/UserFeaturePermissions', secEntityPermissions);
	}

	deleteEntityPermissions(id: number): Observable<boolean> {
		return this.postRequestBase('/api/UserFeaturePermissions/Delete?id=' + id, null);
	}
}