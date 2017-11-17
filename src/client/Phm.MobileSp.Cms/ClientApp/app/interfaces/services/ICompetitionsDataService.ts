import {Observable} from 'rxjs/Observable';
import {Competition} from "../../models/competitionclasses";
import {ApiResponse} from "../../models/apiresponse";

export interface ICompetitionsDataService {
	getCompetitions(): Observable<Competition[]>;
	updateCompetition(competition: Competition): Observable<ApiResponse>;
}