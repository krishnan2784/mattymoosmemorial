import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import { ResponseHelper } from "./responsehelper";
import {ApiResponse} from "../../../models/apiresponse";
import {AlertService} from "./alertservice";

export class RequestHelper {
  constructor(public http: Http, public alertService: AlertService) {}

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
                    this.alertService.displaySuccessFailAlert(response.message, response.success);
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
