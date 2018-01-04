import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import {RequestHelper} from "./helpers/requesthelper";
import {IEntityPermissionDataService} from "../../contracts/services/IEntityPermissionDataService";
import {AlertService} from "./helpers/alertservice";
import {SecFeaturePermission} from "../../models/securityclasses";
import {ResponseHelper} from "./helpers/responsehelper";


@Injectable()
export class EntityPermissionDataService extends RequestHelper implements IEntityPermissionDataService {
	
  constructor(public http: Http, private zone: NgZone, public alertService: AlertService) {
        super(http, alertService);
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
}
