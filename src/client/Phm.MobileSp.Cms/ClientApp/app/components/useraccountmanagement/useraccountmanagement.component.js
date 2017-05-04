"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var base_component_1 = require("../base.component");
var datashareservice_1 = require("../../dataservices/datashareservice");
var userdataservice_1 = require("../../dataservices/userdataservice");
var UserAccountManagementComponent = (function (_super) {
    __extends(UserAccountManagementComponent, _super);
    function UserAccountManagementComponent(sharedService, userDataService) {
        var _this = _super.call(this, sharedService, 'Account Management', true) || this;
        _this.sharedService = sharedService;
        _this.userDataService = userDataService;
        _this.getData();
        return _this;
    }
    UserAccountManagementComponent.prototype.getData = function () {
        var _this = this;
        this.userDataService.getUsers().subscribe(function (result) {
            _this.userAccounts = result;
        });
    };
    return UserAccountManagementComponent;
}(base_component_1.BaseComponent));
UserAccountManagementComponent = __decorate([
    core_1.Component({
        selector: 'useraccountmanagement',
        template: require('./useraccountmanagement.component.html'),
        styles: [require('./useraccountmanagement.component.css')]
    }),
    __metadata("design:paramtypes", [datashareservice_1.ShareService, userdataservice_1.UserDataService])
], UserAccountManagementComponent);
exports.UserAccountManagementComponent = UserAccountManagementComponent;
//# sourceMappingURL=useraccountmanagement.component.js.map