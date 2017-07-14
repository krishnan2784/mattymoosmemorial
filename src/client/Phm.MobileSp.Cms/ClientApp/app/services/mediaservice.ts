import { Component, Input, Injectable, NgZone } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import Requesthelper = require("./helpers/requesthelper");
import RequestHelper = Requesthelper.RequestHelper;
import Mediainfoclasses = require("../models/mediainfoclasses");
import { ResponseHelper } from "./helpers/responsehelper";
import MediaInfo = Mediainfoclasses.MediaInfo;
import DataService = require("../interfaces/services/IMediaDataService");
import IMediaDataService = DataService.IMediaDataService;
import Apiresponse = require("../models/apiresponse");
import ApiResponse = Apiresponse.ApiResponse;

@Injectable()
export class MediaDataService extends RequestHelper implements IMediaDataService {
    public fileUploadService: FileUploadService;
    constructor(public http: Http) {
        super(http);
        this.fileUploadService = new FileUploadService();
    }

    uploadImage(image): Observable<MediaInfo> {
        let input = new FormData();
        input.append("file", image);
        return Observable.create(observer => {
            this.http.post('/Media/UploadImage', input).subscribe(
                (result) => {
                    let response = ResponseHelper.getResponse(result);
                    observer.next(response.content);
                    observer.complete();
                }
            );
        });
    }

    uploadFile(files): Observable<MediaInfo> {
        return Observable.create(observer => {
            this.getAuthToken().subscribe((authtoken) => {
                this.fileUploadService.upload('http://mobilespapi.phm.co.uk/api/AzureMedia', files, authtoken).then((response) => {
                    console.log(response);
                    observer.next(response.content);
                    observer.complete();
                });
                
                let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
                headers.append("Authorization", authtoken);
                headers.append("Accept", 'application/json');
                headers.append("Accept-Language", 'en-gb');
                headers.append("Content-Type", 'multipart/form-data');
                headers.append("Access-Control-Allow-Origin", '*');
                
                let input = new FormData();
                input.append("file", files);
                console.log(input, files, headers);
                var request = this.http.post('http://mobilespapi.phm.co.uk/api/AzureMedia', files, headers).subscribe(
                    (result) => {
                        console.log(result);
                        let response = ResponseHelper.getResponse(result);
                        observer.next(response);
                        observer.complete();
                    }
                );
                console.log(request);
            });
        });
    }


    //uploadFile(files): Observable<MediaInfo> {
    //    return Observable.create(observer => {
    //        this.fileUploadService.upload('/Media/UploadFile', files).then((response) => {
    //            observer.next(response.content);
    //            observer.complete();
    //        });
    //    });
    //}

    private getAuthToken(): Observable<string> {
        return Observable.create(observer => {
            this.getRequestBase('/api/Market/GetAuthToken').subscribe((result) => {
                observer.next(result);
                observer.complete();
            });
        });
    }
}

export class FileUploadService {
    /**
     * @param Observable<number>
     */
    private progress$: Observable<number>;

    /**
     * @type {number}
     */
    private progress: number = 0;

    private progressObserver: any;

    constructor() {
        this.progress$ = new Observable(observer => {
            this.progressObserver = observer;
        });
    }

    /**
     * @returns {Observable<number>}
     */
    public getObserver(): Observable<number> {
        return this.progress$;
    }

    /**
     * Upload files through XMLHttpRequest
     *
     * @param url
     * @param files
     * @returns {Promise<T>}
     */
    public upload(url: string, files: File[], authToken: string): Promise<ApiResponse> {
        return new Promise((resolve, reject) => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                    } else {
                        reject(xhr.response);
                    }
                }
            };

            FileUploadService.setUploadUpdateInterval(500);

            //xhr.upload.onprogress = (event) => {
            //    this.progress = Math.round(event.loaded / event.total * 100);
            //    //this.progressObserver.next(this.progress);
            //};

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', authToken);
            xhr.setRequestHeader('Content-Type', 'multipart/form-data');
            xhr.setRequestHeader("Accept", 'application/json');
            xhr.setRequestHeader("Accept-Language", 'en-GB');
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.send(formData);
        });
    }

    /**
     * Set interval for frequency with which Observable inside Promise will share data with subscribers.
     *
     * @param interval
     */
    private static setUploadUpdateInterval(interval: number): void {
        setInterval(() => { }, interval);
    }
}