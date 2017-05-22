"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this.id = options.id || 0;
        this.name = options.name || '';
        this.isDefault = options.isDefault || false;
        this.isMaster = options.isMaster || false;
    }
    return UserMarket;
}());
exports.UserMarket = UserMarket;
//# sourceMappingURL=userclasses.js.map