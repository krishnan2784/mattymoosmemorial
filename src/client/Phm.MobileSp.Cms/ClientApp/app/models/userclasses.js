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
        this.id = options.id;
        this.firstName = options.firstName;
        this.lastName = options.lastName;
        this.userName = options.userName;
        this.role = options.role;
        this.dealer = options.dealer;
        this.market = options.market;
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
//# sourceMappingURL=userclasses.js.map