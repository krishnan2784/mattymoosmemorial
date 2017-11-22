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
require("rxjs/add/operator/map");
require("rxjs/add/operator/publishReplay");
var requesthelper_1 = require("./helpers/requesthelper");
var TermsAndConditionsDataService = (function (_super) {
    __extends(TermsAndConditionsDataService, _super);
    function TermsAndConditionsDataService(http) {
        var _this = _super.call(this, http) || this;
        _this.http = http;
        return _this;
    }
    TermsAndConditionsDataService.prototype.getTermsAndConditions = function () {
        return this.getRequestBase('/api/TermsAndConditions');
    };
    TermsAndConditionsDataService.prototype.updateTermsAndCondition = function (termsAndConditions) {
        return this.postRequestFull('/api/TermsAndConditions', termsAndConditions);
    };
    TermsAndConditionsDataService.prototype.deleteTermsAndCondition = function (id) {
        return this.postRequestBase('/api/TermsAndConditions/Delete?id=' + id, null);
    };
    return TermsAndConditionsDataService;
}(requesthelper_1.RequestHelper));
TermsAndConditionsDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], TermsAndConditionsDataService);
exports.TermsAndConditionsDataService = TermsAndConditionsDataService;
//# sourceMappingURL=termsandconditionsdataservice.js.map