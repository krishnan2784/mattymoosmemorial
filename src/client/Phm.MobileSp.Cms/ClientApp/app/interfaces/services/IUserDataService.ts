import {Observable} from 'rxjs/Observable';
import Userclasses = require("../../models/userclasses");

export interface IUserDataService {
    getCurrentUser(): Observable<Userclasses.User>;
    getUsers(userId: number): Observable<Userclasses.UserTemplate[]>;
    getUsers(userId: number): Observable<Userclasses.UserTemplate[]>;
    getUserMarkets(): Observable<Userclasses.UserMarket[]>;
}