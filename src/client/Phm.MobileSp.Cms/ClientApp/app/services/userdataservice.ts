import { Component, Input, Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { IUserDataService } from "../interfaces/services/IUserDataService";
import { ResponseHelper } from "./helpers/responsehelper";
import Userclasses = require("../models/userclasses");
import { ApiResponse } from "../models/apiresponse";
import UserAccount = Userclasses.UserAccount;
import Requesthelper = require("./helpers/requesthelper");
import RequestHelper = Requesthelper.RequestHelper;

@Injectable()
export class UserDataService extends RequestHelper implements IUserDataService {

    constructor(public http: Http, private zone: NgZone) {
        super(http);
    }

    public getUsers(): Observable<Userclasses.UserAccount[]> {
        return Observable.create(observer => {
            this.http.get('/api/AccountManagement/UserList').subscribe(result => {
                let response = ResponseHelper.getResponse(result);
                observer.next(response.content);
                observer.complete();
            });
        });
    }


    public getUserMarkets(): Observable<Userclasses.UserMarket[]> {
        return Observable.create(observer => {
            this.http.get('/api/AccountManagement/GetUserMarkets').subscribe(result => {
                let response = ResponseHelper.getResponse(result);
                observer.next(response.content);
                observer.complete();
            });
        });
    }

    public updateUser(user: UserAccount): Observable<ApiResponse> {
        return this.postRequestFull('/api/AccountManagement/UpdateUser', user);
    }
}