"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userclasses_1 = require("../userclasses");
var securityclasses_1 = require("../securityclasses");
var UserGroupPermissionIndexViewModel = (function () {
    function UserGroupPermissionIndexViewModel(options) {
        if (options === void 0) { options = {}; }
        this.marketUserGroups = options['marketUserGroups'] || [];
    }
    return UserGroupPermissionIndexViewModel;
}());
exports.UserGroupPermissionIndexViewModel = UserGroupPermissionIndexViewModel;
var MarketUserGroup = (function () {
    function MarketUserGroup(options) {
        if (options === void 0) { options = {}; }
        this.market = options['market'] || new userclasses_1.UserMarket();
        this.securityGroupUsers = options['securityGroups'] || [];
    }
    return MarketUserGroup;
}());
exports.MarketUserGroup = MarketUserGroup;
var SecurityGroupUsers = (function () {
    function SecurityGroupUsers(options) {
        if (options === void 0) { options = {}; }
        this.securityGroup = options['securityGroup'] || new securityclasses_1.SecGroup();
        this.users = options['users'] || [];
    }
    return SecurityGroupUsers;
}());
exports.SecurityGroupUsers = SecurityGroupUsers;
//# sourceMappingURL=usergrouppermissionindexviewmodel.js.map