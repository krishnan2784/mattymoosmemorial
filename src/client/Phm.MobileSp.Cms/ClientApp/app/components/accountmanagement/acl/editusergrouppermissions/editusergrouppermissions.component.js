"use strict";
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
var shareservice_1 = require("../../../../services/helpers/shareservice");
var entitypermissiondataservice_1 = require("../../../../services/entitypermissiondataservice");
var forms_1 = require("@angular/forms");
var userfeaturepermissionsdataservice_1 = require("../../../../services/userfeaturepermissionsdataservice");
var usergrouppermissiondataservice_1 = require("../../../../services/usergrouppermissiondataservice");
var permissionservice_1 = require("../../../../services/helpers/permissionservice");
var EditUserGroupComponent = (function () {
    function EditUserGroupComponent(epDataService, entityPermissionDataService, userGroupPermissionDataService, sharedService, permissionService) {
        this.epDataService = epDataService;
        this.entityPermissionDataService = entityPermissionDataService;
        this.userGroupPermissionDataService = userGroupPermissionDataService;
        this.sharedService = sharedService;
        this.permissionService = permissionService;
        this.permissionsUpdated = new core_1.EventEmitter();
        this.loading = true;
        this.form = new forms_1.FormGroup({});
    }
    EditUserGroupComponent.prototype.ngOnInit = function () {
        this.getData();
        this.setupSteps();
    };
    EditUserGroupComponent.prototype.ngOnDestroy = function () {
    };
    EditUserGroupComponent.prototype.getData = function () {
        var _this = this;
        this.userGroupPermissionDataService.getSecurityGroupUsers(this.secEntityId).subscribe(function (x) {
            _this.usersInGroup = x ? x : [];
        });
        this.epDataService.getEntityPermissions(this.secEntityId).subscribe(function (x) {
            _this.groupFeaturePermissions = (!x || x.length === 0 ? [] : x);
        });
    };
    EditUserGroupComponent.prototype.setupSteps = function () {
        this.navbarData = [{ id: 'group', text: 'Group Permissions', selected: this.currentStep === 'group' },
            { id: 'users', text: 'Users Permissions', selected: this.currentStep === 'users' }];
    };
    EditUserGroupComponent.prototype.updateCurrentStep = function (step) {
        this.currentStep = step;
    };
    EditUserGroupComponent.prototype.save = function (secFeaturePermissions, isValid, goBack) {
        var _this = this;
        if (goBack === void 0) { goBack = true; }
        this.loading = true;
        this.entityPermissionDataService.updateEntityPermissions(secFeaturePermissions.secEntityPermissions).subscribe(function (x) {
            _this.loading = false;
            if (x && x.success) {
                _this.permissionService.refreshData();
                if (goBack) {
                    _this.permissionsUpdated.emit(x.content);
                }
            }
        });
    };
    EditUserGroupComponent.prototype.goBack = function () {
        this.permissionsUpdated.emit(null);
    };
    return EditUserGroupComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EditUserGroupComponent.prototype, "allSecurityFeatures", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EditUserGroupComponent.prototype, "secEntityId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditUserGroupComponent.prototype, "currentStep", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EditUserGroupComponent.prototype, "permissionsUpdated", void 0);
EditUserGroupComponent = __decorate([
    core_1.Component({
        selector: 'editusergrouppermissions',
        template: require('./editusergrouppermissions.component.html'),
        styles: [require('./editusergrouppermissions.component.css')]
    }),
    __metadata("design:paramtypes", [entitypermissiondataservice_1.EntityPermissionDataService,
        userfeaturepermissionsdataservice_1.UserFeaturePermissionsDataService,
        usergrouppermissiondataservice_1.UserGroupPermissionDataService,
        shareservice_1.ShareService, permissionservice_1.PermissionService])
], EditUserGroupComponent);
exports.EditUserGroupComponent = EditUserGroupComponent;
//# sourceMappingURL=editusergrouppermissions.component.js.map