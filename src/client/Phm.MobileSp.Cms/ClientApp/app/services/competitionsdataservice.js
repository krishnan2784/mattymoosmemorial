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
var enums_1 = require("../enums");
var marketcontentdataservice_1 = require("./marketcontentdataservice ");
var CompetitionsDataService = (function (_super) {
    __extends(CompetitionsDataService, _super);
    function CompetitionsDataService(http) {
        var _this = _super.call(this, http, enums_1.CopiedElementTypeEnum.Competition, 'Competition') || this;
        _this.http = http;
        return _this;
    }
    CompetitionsDataService.prototype.getCompetitions = function () {
        return this.getRequestBase('/api/Competition');
    };
    CompetitionsDataService.prototype.updateCompetition = function (competition) {
        return this.postRequestFull('/api/Competition', competition);
    };
    CompetitionsDataService.prototype.deleteCompetition = function (id) {
        return this.postRequestBase('/api/Competition/Delete?id=' + id, null);
    };
    return CompetitionsDataService;
}(marketcontentdataservice_1.MarketContentDataService));
CompetitionsDataService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], CompetitionsDataService);
exports.CompetitionsDataService = CompetitionsDataService;
//# sourceMappingURL=competitionsdataservice.js.map