import {Observable} from 'rxjs/Observable';
import {SecUserFeaturePermission, SecFeature } from "../../models/securityclasses";

export interface ISecurityFeatureDataService {
	getSecurityFeatures(): Observable<SecFeature[]>;
}