"use strict";
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/publishReplay");
var responsehelper_1 = require("./responsehelper");
var apiresponse_1 = require("../../models/apiresponse");
var RequestHelper = (function () {
    function RequestHelper(http) {
        this.http = http;
    }
    RequestHelper.prototype.getRequestBase = function (url, params) {
        var _this = this;
        if (params === void 0) { params = []; }
        return Observable_1.Observable.create(function (observer) {
            _this.getRequestFull(url, params).subscribe(function (result) {
                observer.next(result.content);
                observer.complete();
            });
        });
    };
    RequestHelper.prototype.getRequestFull = function (url, params) {
        var _this = this;
        if (params === void 0) { params = []; }
        return Observable_1.Observable.create(function (observer) {
            var parameters = '';
            if (params.length > 0) {
                parameters = '?' + JSON.stringify(parameters);
            }
            _this.http.get(url + parameters).subscribe(function (result) {
                var response = responsehelper_1.ResponseHelper.getResponse(result);
                //if (response.success) {
                //    this.notifier.success('Success', response.message);
                //} else {
                //    this.notifier.error('Error', response.message);
                //}
                observer.next(response);
                observer.complete();
            });
        });
    };
    RequestHelper.prototype.postRequestBase = function (url, object) {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            _this.postRequestFull(url, object).subscribe(function (result) {
                observer.next(result.content);
                observer.complete();
            });
        });
    };
    RequestHelper.prototype.postRequestFull = function (url, object) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var body = JSON.stringify(object);
        return Observable_1.Observable.create(function (observer) {
            _this.http.post(url, body, { headers: headers }).subscribe(function (result) {
                var response = responsehelper_1.ResponseHelper.getResponse(result);
                //if (response.success) {
                //    this.notifier.success(response.message);
                //} else {
                //    this.notifier.error(response.message);
                //}
                observer.next(response);
                observer.complete();
            });
        });
    };
    RequestHelper.getResponse = function (response) {
        response = new apiresponse_1.ApiResponse(response.json());
        return response;
    };
    return RequestHelper;
}());
exports.RequestHelper = RequestHelper;
//# sourceMappingURL=requesthelper.js.map