import {Observable} from 'rxjs/Observable';
import Userclasses = require("../../models/userclasses");

export interface IUserDataService {
    getUserMarkets(): Observable<Userclasses.UserMarket[]>;
}