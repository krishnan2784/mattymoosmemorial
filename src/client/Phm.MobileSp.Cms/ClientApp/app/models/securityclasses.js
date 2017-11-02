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
//# sourceMappingURL=securityclasses.js.map