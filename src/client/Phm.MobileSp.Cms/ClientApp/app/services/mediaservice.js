"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/share");
require("rxjs/add/operator/map");
require("rxjs/add/operator/publishReplay");
var Requesthelper = require("./helpers/requesthelper");
var RequestHelper = Requesthelper.RequestHelper;
var responsehelper_1 = require("./helpers/responsehelper");
var MediaDataService = (function (_super) {
    __extends(MediaDataService, _super);
    function MediaDataService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        _this.fileUploadService = new FileUploadService();
        return _this;
    }
    MediaDataService.prototype.uploadImage = function (image) {
        var _this = this;
        var input = new FormData();
        input.append("file", image);
        return Observable_1.Observable.create(function (observer) {
            _this.http.post('/Media/UploadImage', input).subscribe(function (result) {
                var response = responsehelper_1.ResponseHelper.getResponse(result);
                observer.next(response.content);
                observer.complete();
            });
        });
    };
    MediaDataService.prototype.uploadFile = function (files) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.getAuthToken().subscribe(function (authtoken) {
                //this.fileUploadService.upload('http://mobilespapi.phm.co.uk/api/AzureMedia', files, authtoken).then((response) => {
                //    console.log(response);
                //    observer.next(response.content);
                //    observer.complete();
                //});
                var headers = new http_1.Headers({ 'Content-Type': 'multipart/form-data' });
                headers.append("Authorization", authtoken);
                headers.append("Accept", 'application/json');
                headers.append("Accept-Language", 'en-gb');
                var input = new FormData();
                input.append("file", files);
                console.log(input, files, headers);
                var request = _this.http.post('http://mobilespapi.phm.co.uk/api/AzureMedia', input, headers).subscribe(function (result) {
                    console.log(result);
                    var response = responsehelper_1.ResponseHelper.getResponse(result);
                    observer.next(response);
                    observer.complete();
                });
                console.log(request);
            });
        });
    };
    //uploadFile(files): Observable<MediaInfo> {
    //    return Observable.create(observer => {
    //        this.fileUploadService.upload('/Media/UploadFile', files).then((response) => {
    //            observer.next(response.content);
    //            observer.complete();
    //        });
    //    });
    //}
    MediaDataService.prototype.getAuthToken = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.getRequestBase('/api/Market/GetAuthToken').subscribe(function (result) {
                observer.next(result);
                observer.complete();
            });
        });
    };
    return MediaDataService;
}(RequestHelper));
MediaDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], MediaDataService);
exports.MediaDataService = MediaDataService;
var FileUploadService = (function () {
    function FileUploadService() {
        var _this = this;
        /**
         * @type {number}
         */
        this.progress = 0;
        this.progress$ = new Observable_1.Observable(function (observer) {
            _this.progressObserver = observer;
        });
    }
    /**
     * @returns {Observable<number>}
     */
    FileUploadService.prototype.getObserver = function () {
        return this.progress$;
    };
    /**
     * Upload files through XMLHttpRequest
     *
     * @param url
     * @param files
     * @returns {Promise<T>}
     */
    FileUploadService.prototype.upload = function (url, files, authToken) {
        return new Promise(function (resolve, reject) {
            var formData = new FormData(), xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append("uploads[]", files[i], files[i].name);
            }
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                    }
                    else {
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
            xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
            xhr.send(formData);
        });
    };
    /**
     * Set interval for frequency with which Observable inside Promise will share data with subscribers.
     *
     * @param interval
     */
    FileUploadService.setUploadUpdateInterval = function (interval) {
        setInterval(function () { }, interval);
    };
    return FileUploadService;
}());
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=mediaservice.js.map