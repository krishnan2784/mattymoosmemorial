import {Observable} from 'rxjs/Observable';
import {BaseBrandingConfiguration, BrandingElement } from "../../models/brandingclasses";

export interface IBrandingService {
	getBranding(): Observable<BaseBrandingConfiguration[]>;
	updateBranding(brandingElements: BrandingElement[]): Observable<BrandingElement[]>;
}