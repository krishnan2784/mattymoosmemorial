import {Observable} from 'rxjs/Observable';
import {BaseBrandingConfiguration, BrandingElement } from "../../models/brandingclasses";

export interface IBrandingService {
	getBranding(): Observable<{ brandingConfigurations: BaseBrandingConfiguration[], brandingOptions: any }>;
	updateBranding(brandingElements: BrandingElement[]): Observable<BrandingElement[]>;
}