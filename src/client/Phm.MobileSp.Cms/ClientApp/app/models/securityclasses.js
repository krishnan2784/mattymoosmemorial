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
var baseclasses_1 = require("./baseclasses");
var enums_1 = require("../enums");
var SecEntity = (function (_super) {
    __extends(SecEntity, _super);
    function SecEntity(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.secEntityType = options['secEntityType'];
        return _this;
    }
    return SecEntity;
}(baseclasses_1.BaseModel));
exports.SecEntity = SecEntity;
var SecUserFeaturePermission = (function () {
    function SecUserFeaturePermission(options) {
        if (options === void 0) { options = {}; }
        this.id = options['id'] || 0;
        this.userId = options['userId'] || 0;
        this.featureBitmask = options['featureBitmask'] || 0;
        this.featureUri = options['featureUri'] || '';
        this.featureHttpVerb = options['featureHttpVerb'] || '';
        this.allow = options['allow'] || false;
        this.secFeatureType = options['secFeatureType'];
    }
    return SecUserFeaturePermission;
}());
exports.SecUserFeaturePermission = SecUserFeaturePermission;
var SecGroup = (function (_super) {
    __extends(SecGroup, _super);
    function SecGroup(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.name = options['name'] || '';
        _this.description = options['description'] || '';
        _this.maxUserCount = options['maxUserCount'] || 0;
        _this.secEntityId = options['secEntityId'] || 0;
        _this.isBuiltIn = options['isBuiltIn'] || false;
        return _this;
    }
    return SecGroup;
}(baseclasses_1.BaseModel));
exports.SecGroup = SecGroup;
var SecFeature = (function () {
    function SecFeature(options) {
        if (options === void 0) { options = {}; }
        this.id = options['id'] || 0;
        this.createdAt = options['createdAt'] || '';
        this.updatedAt = options['updatedAt'] || '';
        this.code = options['code'] || 0;
        this.uri = options['uri'] || '';
        this.httpVerb = options['httpVerb'] || '';
        this.bitMaskValue = options['bitMaskValue'] || 0;
        this.secFeatureType = options['secFeatureType'] || enums_1.SecFeatureTypeEnum.Cms;
    }
    return SecFeature;
}());
exports.SecFeature = SecFeature;
var SecFeaturePermission = (function () {
    function SecFeaturePermission(options) {
        if (options === void 0) { options = {}; }
        this.id = options['id'] || 0;
        this.createdAt = options['createdAt'] || '';
        this.updatedAt = options['updatedAt'] || '';
        this.secEntityId = options['secEntityId'] || 0;
        this.secFeatureId = options['secFeatureId'] || 0;
        this.allow = options['allow'];
    }
    return SecFeaturePermission;
}());
exports.SecFeaturePermission = SecFeaturePermission;
var UserSecFeaturePermission = (function () {
    function UserSecFeaturePermission(options) {
        if (options === void 0) { options = {}; }
        this.uri = options['uri'] || '';
        this.httpVerb = options['httpVerb'] || '';
        this.bitMaskValue = options['bitMaskValue'] || 0;
        this.secFeatureType = options['secFeatureType'] || enums_1.SecFeatureTypeEnum.Cms;
        this.allow = options['allow'];
    }
    return UserSecFeaturePermission;
}());
exports.UserSecFeaturePermission = UserSecFeaturePermission;
//# sourceMappingURL=securityclasses.js.map