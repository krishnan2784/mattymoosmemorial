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
var securityclasses_1 = require("../../../../models/securityclasses");
var entitypermissiondataservice_1 = require("../../../../services/entitypermissiondataservice");
var forms_1 = require("@angular/forms");
var enums_1 = require("../../../../enums");
var EditEntityPermissionsListComponent = (function () {
    function EditEntityPermissionsListComponent(epDataService, sharedService) {
        this.epDataService = epDataService;
        this.sharedService = sharedService;
        this.groupFeaturePermissions = [];
        this.formLoaded = new core_1.EventEmitter();
        this.secFeatureTypeEnum = enums_1.SecFeatureTypeEnum;
    }
    EditEntityPermissionsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.groupMode) {
            setTimeout(function () {
                _this.entityFeaturePermissions = _this.groupFeaturePermissions;
                _this.setupForm();
                _this.formLoaded.emit(true);
            }, 10);
        }
        else
            this.getData();
    };
    EditEntityPermissionsListComponent.prototype.ngOnDestroy = function () {
    };
    EditEntityPermissionsListComponent.prototype.getData = function () {
        var _this = this;
        if (this.groupMode)
            this.epDataService.getEntityPermissions(this.secEntityId).subscribe(function (x) {
                _this.entityFeaturePermissions = (!x || x.length === 0 ? [] : x);
                _this.setupForm();
                _this.formLoaded.emit(true);
            });
        else {
            this.epDataService.getUserPermissions(this.userId).subscribe(function (x) {
                //console.log(this.secEntityId);
                //console.log(x);
                _this.entityFeaturePermissions = (!x || x.permissions.length === 0 ? [] : x.permissions);
                _this.secEntityId = x.secEntityId;
                _this.setupForm();
                _this.formLoaded.emit(true);
            });
        }
    };
    EditEntityPermissionsListComponent.prototype.setupForm = function () {
        var _this = this;
        var formArray = new forms_1.FormArray([]);
        this.allSecurityFeatures.forEach(function (x) {
            var up = _this.entityFeaturePermissions.filter(function (y) { return x.id === y.secFeatureId; })[0];
            if (!up && _this.groupFeaturePermissions)
                up = _this.groupFeaturePermissions.filter(function (y) { return x.id === y.secFeatureId; })[0];
            if (up)
                formArray.push(_this.initFeature(up));
            else
                formArray.push(_this.initFeature(new securityclasses_1.SecFeaturePermission({
                    secEntityId: _this.secEntityId,
                    secFeatureId: x.id,
                    allow: false
                })));
        });
        this.form.addControl('secEntityPermissions', formArray);
    };
    EditEntityPermissionsListComponent.prototype.initFeature = function (feature) {
        if (feature === void 0) { feature = null; }
        return new forms_1.FormGroup({
            secEntityId: new forms_1.FormControl(this.secEntityId, []),
            secFeatureId: new forms_1.FormControl(feature.secFeatureId, []),
            allow: new forms_1.FormControl(feature.allow, []),
        });
    };
    EditEntityPermissionsListComponent.prototype.setPermission = function (i, permitted) {
        var permissions = this.form.controls['secEntityPermissions'];
        var thisPermission = permissions.controls[i];
        thisPermission.controls.allow.setValue(permitted, { onlySelf: true });
        thisPermission.controls.allow.updateValueAndValidity();
    };
    return EditEntityPermissionsListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EditEntityPermissionsListComponent.prototype, "allSecurityFeatures", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], EditEntityPermissionsListComponent.prototype, "secEntityId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], EditEntityPermissionsListComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], EditEntityPermissionsListComponent.prototype, "groupFeaturePermissions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditEntityPermissionsListComponent.prototype, "groupMode", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], EditEntityPermissionsListComponent.prototype, "userId", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], EditEntityPermissionsListComponent.prototype, "formLoaded", void 0);
EditEntityPermissionsListComponent = __decorate([
    core_1.Component({
        selector: 'editentitypermissionslist',
        template: require('./editentitypermissionslist.component.html'),
        styles: [require('./editentitypermissionslist.component.css')]
    }),
    __metadata("design:paramtypes", [entitypermissiondataservice_1.EntityPermissionDataService,
        shareservice_1.ShareService])
], EditEntityPermissionsListComponent);
exports.EditEntityPermissionsListComponent = EditEntityPermissionsListComponent;
//# sourceMappingURL=editentitypermissionslist.component.js.map