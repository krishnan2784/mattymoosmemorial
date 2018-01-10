import {Observable} from 'rxjs/Observable';

export interface IDeleteModelDataService {
  deleteItem(id: number): Observable<boolean>;
}
