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
var userclasses_1 = require("../../../../models/userclasses");
var EditUserPermissionsComponent = (function () {
    function EditUserPermissionsComponent(epDataService, entityPermissionDataService, sharedService) {
        this.epDataService = epDataService;
        this.entityPermissionDataService = entityPermissionDataService;
        this.sharedService = sharedService;
        this.savePermissions = new core_1.EventEmitter();
        this.editMode = false;
        this.loading = true;
        this.form = new forms_1.FormGroup({});
    }
    EditUserPermissionsComponent.prototype.ngOnInit = function () {
    };
    EditUserPermissionsComponent.prototype.ngOnDestroy = function () {
    };
    EditUserPermissionsComponent.prototype.save = function (secFeaturePermissions, isValid) {
        if (isValid)
            this.savePermissions.emit(secFeaturePermissions);
    };
    EditUserPermissionsComponent.prototype.goBack = function () {
        this.editMode = false;
    };
    return EditUserPermissionsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EditUserPermissionsComponent.prototype, "allSecurityFeatures", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EditUserPermissionsComponent.prototype, "secEntityId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", userclasses_1.User)
], EditUserPermissionsComponent.prototype, "user", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EditUserPermissionsComponent.prototype, "groupFeaturePermissions", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], EditUserPermissionsComponent.prototype, "savePermissions", void 0);
EditUserPermissionsComponent = __decorate([
    core_1.Component({
        selector: 'edituserpermissions',
        template: require('./edituserpermissions.component.html'),
        styles: [require('./edituserpermissions.component.css')]
    }),
    __metadata("design:paramtypes", [entitypermissiondataservice_1.EntityPermissionDataService,
        userfeaturepermissionsdataservice_1.UserFeaturePermissionsDataService,
        shareservice_1.ShareService])
], EditUserPermissionsComponent);
exports.EditUserPermissionsComponent = EditUserPermissionsComponent;
//# sourceMappingURL=edituserpermissions.component.js.map