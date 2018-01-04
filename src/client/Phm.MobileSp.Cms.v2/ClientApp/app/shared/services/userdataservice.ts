import { Injectable, NgZone } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import {RequestHelper} from "./helpers/requesthelper";
import {IUserDataService} from "../../contracts/services/IUserDataService";
import {AlertService} from "./helpers/alertservice";
import {ResponseHelper} from "./helpers/responsehelper";
import {ApiResponse} from "../../models/apiresponse";
import {User, UserTemplate, UserMarket } from "../../models/userclasses";


@Injectable()
export class UserDataService extends RequestHelper implements IUserDataService {

  constructor(public http: Http, private zone: NgZone, public alertService: AlertService) {
    super(http, alertService);
  }

  public getCurrentUser(): Observable<User> {
    return Observable.create(observer => {
      this.http.get('/api/AccountManagement/GetCurrentUser').subscribe(result => {
        let response = ResponseHelper.getResponse(result);
        observer.next(new User(response.content));
        observer.complete();
      });
    });
  }

  public getUser(userId: number): Observable<UserTemplate> {
    return Observable.create(observer => {
      this.getUsers(userId).subscribe(result => {
        if (result && result.length > 0)
          observer.next(result[0]);
        observer.complete();
      });
    });
  }

  public getUsers(userId: number = null): Observable<UserTemplate[]> {
    return Observable.create(observer => {
      this.http.get('/api/AccountManagement/GetUsers' + (userId ? "?userId=" + userId : "")).subscribe(result => {
        let response = ResponseHelper.getResponse(result);
        observer.next(response.content);
        observer.complete();
      });
    });
  }


  public getUserMarkets(): Observable<UserMarket[]> {
    return Observable.create(observer => {
      this.http.get('/api/AccountManagement/GetUserMarkets').subscribe(result => {
        let response = ResponseHelper.getResponse(result);
        observer.next(response.content);
        observer.complete();
      });
    });
  }

  public updateUser(user: UserTemplate): Observable<ApiResponse> {
    return this.postRequestFull('/api/AccountManagement/UpdateUser', user);
  }

  public getUserGroups() {
    return this.getRequestBase('/api/AccountManagement/GetSecGroups');
  }

}
