import { Component, Input, Injectable, NgZone, Inject } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { ResponseHelper } from "./helpers/responsehelper";
import { RequestHelper } from "./helpers/requesthelper";
import { ApiResponse } from "../../models/apiresponse";
import {IUserDataService} from "../../contracts/services/IUserDataService";
import {User, UserTemplate, UserMarket } from "../../models/userclasses";
import {ORIGIN_URL} from "../constants/baseurl.constants";
import {AlertService} from "./helpers/alertservice";

@Injectable()
export class UserDataService extends RequestHelper implements IUserDataService {

  constructor(public http: Http, private zone: NgZone, @Inject(ORIGIN_URL) baseUrl: string, public alertService: AlertService) {
        super(http, baseUrl, alertService);
    }

    public getCurrentUser(): Observable<User> {
        return Observable.create(observer => {
            this.http.get(`${this.baseUrl}/api/AccountManagement/GetCurrentUser`).subscribe(result => {
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
            this.http.get(`${this.baseUrl}/api/AccountManagement/GetUsers${userId ? `?userId=${userId}` : ""}`).subscribe(result => {
                let response = ResponseHelper.getResponse(result);
                observer.next(response.content);
                observer.complete();
            });
        });
    }


    public getUserMarkets(): Observable<UserMarket[]> {
        return Observable.create(observer => {
            this.http.get(`${this.baseUrl}/api/AccountManagement/GetUserMarkets`).subscribe(result => {
                let response = ResponseHelper.getResponse(result);
                observer.next(response.content);
                observer.complete();
            });
        });
    }

    public updateUser(user: UserTemplate): Observable<ApiResponse> {
        return this.postRequestFull(`${this.baseUrl}/api/AccountManagement/UpdateUser`, user);
    }

    public getUserGroups() {
        return this.getRequestBase(`${this.baseUrl}/api/AccountManagement/GetSecGroups`);
    }

    public deleteUser(userId: number): Observable<boolean> {
      return this.postRequestBase(`${this.baseUrl}/api/AccountManagement/DeleteUser`, userId);
    }
}
