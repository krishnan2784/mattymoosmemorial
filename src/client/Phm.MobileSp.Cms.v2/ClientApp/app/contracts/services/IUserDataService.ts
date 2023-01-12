import { Observable } from 'rxjs/Observable';

    getCurrentUser(): Observable<User>;
    getUsers(userId: number): Observable<UserTemplate[]>;
    getUsers(userId: number): Observable<UserTemplate[]>;
    getUserMarkets(): Observable<UserMarket[]>;
}