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
Object.defineProperty(exports, "__esModule", { value: true });
var Baseclasses = require("./baseclasses");
var BaseModel = Baseclasses.BaseModel;
var Market = (function (_super) {
    __extends(Market, _super);
    function Market(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.brandId = options['brandId'] || 0;
        _this.code = options['dealershipCode'] || '';
        _this.defaultLanguageId = options['defaultLanguageId'] || 0;
        _this.isLive = options['isLive'] || false;
        _this.isMaster = options['isMaster'] || false;
        _this.name = options['name'] || '';
        _this.useMetricSystem = options['useMetricSystem'] || false;
        return _this;
    }
    return Market;
}(BaseModel));
exports.Market = Market;
//# sourceMappingURL=marketclasses.js.map