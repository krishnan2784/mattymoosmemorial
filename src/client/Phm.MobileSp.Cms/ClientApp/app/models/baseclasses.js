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
var date_1 = require("../classes/helpers/date");
var BaseModel = (function () {
    function BaseModel(options) {
        if (options === void 0) { options = {}; }
        this.id = options['id'] || 0;
        this.enabled = options['enabled'] || true;
        this.published = options['published'] || false;
        this.masterId = options['masterId'];
        this.createdAt = options['createdAt'];
        this.updatedAt = options['updatedAt'];
        var d = date_1.DateEx.formatDate(new Date());
        if (!this.createdAt) {
            this.createdAt = d;
        }
        if (!this.updatedAt) {
            this.updatedAt = d;
        }
    }
    return BaseModel;
}());
exports.BaseModel = BaseModel;
var BaseVersionableEntity = (function (_super) {
    __extends(BaseVersionableEntity, _super);
    function BaseVersionableEntity(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.isPublishedLive = options['isPublishedLive'] || false;
        _this.validVersion = options['validVersion'] || false;
        _this.version = options['version'] || 0;
        return _this;
    }
    return BaseVersionableEntity;
}(BaseModel));
exports.BaseVersionableEntity = BaseVersionableEntity;
//# sourceMappingURL=baseclasses.js.map