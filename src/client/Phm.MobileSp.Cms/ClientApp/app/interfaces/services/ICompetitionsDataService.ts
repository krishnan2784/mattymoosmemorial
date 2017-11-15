import {Observable} from 'rxjs/Observable';
import {BaseModel} from "../../models/baseclasses";

export interface ICompetitionsDataService {
	getCompetitions(): Observable<any>;

}