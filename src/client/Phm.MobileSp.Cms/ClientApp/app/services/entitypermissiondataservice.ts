import { Component, Input, Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { IUserDataService } from "../interfaces/services/IUserDataService";
import { ResponseHelper } from "./helpers/responsehelper";
import Userclasses = require("../models/userclasses");
import { ApiResponse } from "../models/apiresponse";
import Requesthelper = require("./helpers/requesthelper");
import RequestHelper = Requesthelper.RequestHelper;
import {IEntityPermissionDataService} from "../interfaces/services/IEntityPermissionDataService";
import { SecFeaturePermission } from "../models/securityclasses";

@Injectable()
export class EntityPermissionDataService extends RequestHelper implements IEntityPermissionDataService {
	
    constructor(public http: Http, private zone: NgZone) {
        super(http);
    }

	public getEntityPermissions(entityId: number): Observable<SecFeaturePermission[]> {
		return Observable.create(observer => {
			this.http.get('/api/SecurityEntityFeatures/GetEntityPermissions?id=' + entityId).subscribe(result => {
				let response = ResponseHelper.getResponse(result);
				observer.next(response.content);
				observer.complete();
			});
		});
	}

	public getUserPermissions(userId: number = 0): Observable<{ permissions: SecFeaturePermission[], secEntityId :number}> {
		return Observable.create(observer => {
			this.http.get('/api/SecurityEntityFeatures/GetUserPermissions?userId=' + userId).subscribe(result => {
				let response = ResponseHelper.getResponse(result);
				observer.next(response.content);
				observer.complete();
			});
		});
	}
}