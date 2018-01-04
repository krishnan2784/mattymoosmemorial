import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import {RequestHelper} from "./helpers/requesthelper";
import {IMediaDataService} from "../../contracts/services/IMediaDataService";
import {AlertService} from "./helpers/alertservice";
import {MediaInfo} from "../../models/mediainfoclasses";
import {ResponseHelper} from "./helpers/responsehelper";
import {ApiResponse} from "../../models/apiresponse";

@Injectable()
export class MediaDataService extends RequestHelper implements IMediaDataService {
  public fileUploadService: FileUploadService;
  constructor(public http: Http, public alertService: AlertService) {
    super(http, alertService);
    this.fileUploadService = new FileUploadService();
  }

  getMediaInfo(id): Observable<MediaInfo> {
    return Observable.create(observer => {
      this.http.get('/Media/GetMediaInfo?id=' + id).subscribe(
        (result) => {
          let response = ResponseHelper.getResponse(result);
          observer.next(response.content);
          observer.complete();
        }
      );
    });
  }

  uploadFile(file, uploadUrl): Observable<MediaInfo> {
    let input = new FormData();
    input.append("file", file);
    return Observable.create(observer => {
      this.http.post(uploadUrl, input).subscribe(
        (result) => {
          let response = ResponseHelper.getResponse(result);
          var model = new MediaInfo(response.content);
          observer.next(model);
          observer.complete();
        }
      );
    });
  }

  //uploadFile(files): Observable<MediaInfo> {
  //    return Observable.create(observer => {
  //        this.getAuthToken().subscribe((authtoken) => {
  //            this.fileUploadService.upload('/Media/UploadFiles', files, authtoken).then((response) => {
  //                console.log(response);
  //                observer.next(response.content);
  //                observer.complete();
  //            });

  //            //let headers = new Headers({ 'Content-Type': 'multipart/form-data' });
  //            //headers.append("Authorization", authtoken);
  //            //headers.append("Accept", 'application/json');
  //            //headers.append("Accept-Language", 'en-gb');
  //            //headers.append("Access-Control-Allow-Origin", '*');

  //            //let input = new FormData();
  //            //input.append("file", files);
  //            //console.log(input, files, headers);
  //            //var request = this.http.post('http://mobilespapi.phm.co.uk/api/AzureMedia', files, headers).subscribe(
  //            //    (result) => {
  //            //        console.log(result);
  //            //        let response = ResponseHelper.getResponse(result);
  //            //        observer.next(response);
  //            //        observer.complete();
  //            //    }
  //            //);
  //            //console.log(request);
  //        });
  //    });
  //}


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
