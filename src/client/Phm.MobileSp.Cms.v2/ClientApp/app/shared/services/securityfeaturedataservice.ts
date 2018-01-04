import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import {RequestHelper} from "./helpers/requesthelper";
import {ISecurityFeatureDataService} from "../../contracts/services/ISecurityFeatureDataService";
import {AlertService} from "./helpers/alertservice";
import {SecFeature} from "../../models/securityclasses";
import {ResponseHelper} from "./helpers/responsehelper";


@Injectable()
export class SecurityFeatureDataService extends RequestHelper implements ISecurityFeatureDataService {

  constructor(public http: Http, private zone: NgZone, public alertService: AlertService) {
        super(http, alertService);
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
