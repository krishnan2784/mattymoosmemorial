import {Observable} from 'rxjs/Observable';
import { CompetitionSubset} from "../../models/competitionclasses";

export interface ICompetitionSubsetsDataService {
	getCompetitionSubsets(): Observable<CompetitionSubset[]>;
}
