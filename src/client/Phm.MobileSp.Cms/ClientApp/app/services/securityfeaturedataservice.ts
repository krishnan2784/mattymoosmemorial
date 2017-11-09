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
import {SecFeature} from "../models/securityclasses";
import {ISecurityFeatureDataService} from "../interfaces/services/ISecurityFeatureDataService";

@Injectable()
export class SecurityFeatureDataService extends RequestHelper implements ISecurityFeatureDataService {

    constructor(public http: Http, private zone: NgZone) {
        super(http);
    }

	public getSecurityFeatures(): Observable<SecFeature[]> {
		return Observable.create(observer => {
			this.http.get('/api/SecurityFeatures/GetSecurityFeatures').subscribe(result => {
				let response = ResponseHelper.getResponse(result);
				observer.next(response.content);
				observer.complete();
			});
		});
    }
}