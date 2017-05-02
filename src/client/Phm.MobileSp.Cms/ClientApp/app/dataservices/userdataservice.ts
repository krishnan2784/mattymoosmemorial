﻿import { Component, Input, Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { IUserDataService } from "../interfaces/dataservices/IUserDataService";
import { ResponseHelper } from "./helpers/responsehelper";
import Userclasses = require("../models/userclasses");
import { ApiResponse } from "../models/apiresponse";

@Injectable()
export class UserDataService implements IUserDataService {

    constructor(public http: Http, private zone: NgZone) {
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
}