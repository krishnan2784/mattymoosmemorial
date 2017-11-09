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
var EditUserGroupComponent = (function () {
    function EditUserGroupComponent(epDataService, sharedService) {
        this.epDataService = epDataService;
        this.sharedService = sharedService;
        this.loading = true;
        this.form = new forms_1.FormGroup({});
    }
    EditUserGroupComponent.prototype.ngOnInit = function () {
    };
    EditUserGroupComponent.prototype.ngOnDestroy = function () {
    };
    EditUserGroupComponent.prototype.save = function (secFeaturePermissions, isValid) {
        console.log(secFeaturePermissions);
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
EditUserGroupComponent = __decorate([
    core_1.Component({
        selector: 'editusergrouppermissions',
        template: require('./editusergrouppermissions.component.html'),
        styles: [require('./editusergrouppermissions.component.css')]
    }),
    __metadata("design:paramtypes", [entitypermissiondataservice_1.EntityPermissionDataService,
        shareservice_1.ShareService])
], EditUserGroupComponent);
exports.EditUserGroupComponent = EditUserGroupComponent;
//# sourceMappingURL=editusergrouppermissions.component.js.map