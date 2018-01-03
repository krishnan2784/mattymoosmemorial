import {Observable} from 'rxjs/Observable';
import * as Userclasses from "../../models/userclasses";

export interface IUserDataService {
    getCurrentUser(): Observable<Userclasses.User>;
    getUsers(userId: number): Observable<Userclasses.UserTemplate[]>;
    getUsers(userId: number): Observable<Userclasses.UserTemplate[]>;
    getUserMarkets(): Observable<Userclasses.UserMarket[]>;
    deleteUser(userId: number): Observable<boolean>;
}
