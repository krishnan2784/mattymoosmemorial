import {Observable} from 'rxjs/Observable';
import { SecFeature } from "../../models/securityclasses";

export interface ISecurityFeatureDataService {
	getSecurityFeatures(): Observable<SecFeature[]>;
}
