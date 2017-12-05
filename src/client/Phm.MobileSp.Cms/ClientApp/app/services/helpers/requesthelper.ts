import { Component, Input, Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { ResponseHelper } from "./responsehelper";
import { ApiResponse } from "../../models/apiresponse"
import Enums = require("../../enums");
import CopiedElementTypeEnum = Enums.CopiedElementTypeEnum;
declare var Materialize: any;

export class RequestHelper {

    constructor(public http: Http) {
    }

    public getRequestBase(url: string, params: { key: string, value: any }[] = []): Observable<any> {
        return Observable.create(observer => {
            this.getRequestFull(url, params).subscribe(result => {
                observer.next(result.content);
                observer.complete();
            });
        });
    }
    
    public getRequestFull(url: string, params: { key: string, value: any }[] = []): Observable<ApiResponse> {
        return Observable.create(observer => {

            var parameters = '';
            if (params.length > 0) {
                parameters = '?' + JSON.stringify(parameters);
            }

            this.http.get(url + parameters).subscribe(result => {
                let response = ResponseHelper.getResponse(result);

                observer.next(response);
                observer.complete();
            });

        });
    }

    public postRequestBase(url: string, object: any): Observable<any> {
        return Observable.create(observer => {
            this.postRequestFull(url, object).subscribe(result => {
                observer.next(result.content);
                observer.complete();
            });
        });
    }

    public postRequestFull(url: string, object: any): Observable<ApiResponse> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let body = JSON.stringify(object);

        return Observable.create(observer => {
            this.http.post(url, body, { headers: headers }).subscribe(
                (result) => {
                    let response = ResponseHelper.getResponse(result);

                    if (response.success) {
                        Materialize.toast(response.message, 5000, 'green');
                    } else {
                        Materialize.toast(response.message, 5000, 'red');
                    }

                    observer.next(response);
                    observer.complete();
                }
            );
        });
    }

    public static getResponse(response: any): ApiResponse {
        response = new ApiResponse(response.json());
        return response;
    }
}