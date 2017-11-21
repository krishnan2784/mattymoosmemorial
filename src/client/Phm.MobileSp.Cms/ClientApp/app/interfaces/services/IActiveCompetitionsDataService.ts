import {Observable} from 'rxjs/Observable';
import { ActiveCompetition} from "../../models/competitionclasses";
import {ApiResponse} from "../../models/apiresponse";

export interface IActiveCompetitionsDataService {
	getActiveCompetitions(): Observable<ActiveCompetition[]>;
}