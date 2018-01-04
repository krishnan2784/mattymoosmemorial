import {Observable} from 'rxjs/Observable';
import { CompetitionSubset} from "../../models/competitionclasses";
import {ApiResponse} from "../../models/apiresponse";

export interface ICompetitionSubsetsDataService {
	getCompetitionSubsets(): Observable<CompetitionSubset[]>;
}