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
var UserAccount = (function () {
    function UserAccount(options) {
        if (options === void 0) { options = {}; }
        this.id = options.id || 0;
        this.firstName = options.firstName || '';
        this.lastName = options.lastName || '';
        this.userName = options.userName || '';
        this.email = options.email || '';
        this.role = options.role || 'Sales Manager';
        this.dealershipCode = options.dealershipCode || '';
        this.dealershipName = options.dealershipName || '';
        this.region = options.region || '';
        this.zone = options.zone || '';
        this.market = options.market || '';
        this.createdDate = options.createdDate;
    }
    return UserAccount;
}());
exports.UserAccount = UserAccount;
var UserMarket = (function () {
    function UserMarket(options) {
        if (options === void 0) { options = {}; }
        this.id = options.id || null;
        this.name = options.name || '';
        this.isDefault = options.isDefault || false;
        this.isMaster = options.isMaster || false;
        this.isLive = options.isLive || false;
    }
    return UserMarket;
}());
exports.UserMarket = UserMarket;
var ContentMarket = (function (_super) {
    __extends(ContentMarket, _super);
    function ContentMarket(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.isCopied = options['isCopied'] || false;
        return _this;
    }
    return ContentMarket;
}(UserMarket));
exports.ContentMarket = ContentMarket;
var User = (function (_super) {
    __extends(User, _super);
    function User(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.dealershipCode = options['dealershipCode'] || '';
        _this.dealershipName = options['dealershipName'] || '';
        _this.email = options['email'] || '';
        _this.firstName = options['firstName'] || '';
        _this.lastName = options['lastName'] || '';
        _this.userName = options['userName'] || '';
        _this.secEntityId = options['secEntityId'] || 0;
        _this.sessionExpireMinutes = options['sessionExpireMinutes'] || 20;
        _this.isBuiltIn = options['isBuiltIn'] || false;
        return _this;
    }
    return User;
}(BaseModel));
exports.User = User;
var UserTemplate = (function (_super) {
    __extends(UserTemplate, _super);
    function UserTemplate(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.dealershipCode = options['dealershipCode'] || '';
        _this.dealershipName = options['dealershipName'] || '';
        _this.areaCode = options['areaCode'] || '';
        _this.areaName = options['areaName'] || '';
        _this.regionCode = options['regionCode'] || '';
        _this.regionName = options['regionName'] || '';
        _this.zoneCode = options['zoneCode'] || '';
        _this.zoneName = options['zoneName'] || '';
        _this.email = options['email'] || '';
        _this.firstName = options['firstName'] || '';
        _this.lastName = options['lastName'] || '';
        _this.userName = options['userName'] || '';
        _this.avatarId = options['avatarId'];
        _this.avatar = options['avatar'];
        _this.totalMLearningPoints = options['totalMLearningPoints'] || 0;
        _this.secGroup = options['secGroup'] || { id: 0, name: '' };
        return _this;
    }
    return UserTemplate;
}(BaseModel));
exports.UserTemplate = UserTemplate;
//# sourceMappingURL=userclasses.js.map