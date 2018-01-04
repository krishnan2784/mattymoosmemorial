import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { RequestHelper } from "./helpers/requesthelper";
import {IBrandingService} from "../../contracts/services/IBrandingService";
import {AlertService} from "./helpers/alertservice";
import {BaseBrandingConfiguration, BrandingElement } from "../../models/brandingclasses";

@Injectable()
export class BrandingService extends RequestHelper implements IBrandingService {

  constructor(public http: Http, public alertService: AlertService) {
        super(http, alertService);
    }

	public getBranding(): Observable<{brandingConfigurations: BaseBrandingConfiguration[], brandingOptions: any}> {
      return this.getRequestBase('/api/Branding/Get');
    }

	public updateBranding(brandingElements: BrandingElement[]): Observable<BrandingElement[]> {
		return this.postRequestBase('/api/Branding/Update', brandingElements);
	}

}
