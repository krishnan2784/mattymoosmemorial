import {Observable} from 'rxjs/Observable';
import {Competition} from "../../models/competitionclasses";
import {ApiResponse} from "../../models/apiresponse";
import { IDeleteModelDataService } from './IDeleteModelDataService';

export interface ICompetitionsDataService extends IDeleteModelDataService {
	getCompetitions(): Observable<Competition[]>;
	updateCompetition(competition: Competition): Observable<ApiResponse>;
}
