import { Observable } from 'rxjs/Observable';import {User, UserTemplate, UserMarket } from "../../models/userclasses";
export interface IUserDataService {
    getCurrentUser(): Observable<User>;
    getUsers(userId: number): Observable<UserTemplate[]>;
    getUsers(userId: number): Observable<UserTemplate[]>;
    getUserMarkets(): Observable<UserMarket[]>;
}
