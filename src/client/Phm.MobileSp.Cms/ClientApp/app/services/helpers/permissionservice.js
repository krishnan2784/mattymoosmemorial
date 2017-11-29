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
require("rxjs/add/operator/map");
require("rxjs/add/operator/publishReplay");
var shareservice_1 = require("./shareservice");
var entitypermissiondataservice_1 = require("../entitypermissiondataservice");
var navmenuclasses_1 = require("../../models/navmenuclasses");
var securityfeaturedataservice_1 = require("../securityfeaturedataservice");
var enums_1 = require("../../enums");
var PermissionService = (function () {
    function PermissionService(shareService, entityPermissionDataService, securityFeatureDataService) {
        this.shareService = shareService;
        this.entityPermissionDataService = entityPermissionDataService;
        this.securityFeatureDataService = securityFeatureDataService;
        this.usersPermissions = [];
        this.refreshData();
    }
    PermissionService.prototype.refreshData = function () {
        var _this = this;
        this.currentUsersPermissions = null;
        this.allFeatures = null;
        this.usersPermissions = [];
        this.securityFeatureDataService.getSecurityFeatures().subscribe(function (result) {
            _this.allFeatures = result ? result : [];
            _this.entityPermissionDataService.getUserPermissions().subscribe(function (response) {
                _this.currentUsersPermissions = response ? response.permissions : [];
                _this.allFeatures.forEach(function (x) {
                    var up = _this.currentUsersPermissions.filter(function (y) { return y.secFeatureId === x.id && y.allow; })[0];
                    _this.usersPermissions.push({
                        uri: x.uri,
                        httpVerb: x.httpVerb,
                        bitMaskValue: x.bitMaskValue,
                        secFeatureType: x.secFeatureType,
                        allow: up !== undefined
                    });
                });
                _this.setupBaseNavMenu();
            });
        });
    };
    PermissionService.prototype.hasPermission = function (uri, httpVerb, secFeatureType) {
        if (secFeatureType === void 0) { secFeatureType = enums_1.SecFeatureTypeEnum.Cms; }
        var up = this.usersPermissions ? this.usersPermissions.filter(function (x) { return x.uri.toLowerCase() === uri.toLowerCase() &&
            x.httpVerb.toLowerCase() === httpVerb.toLowerCase() &&
            x.secFeatureType == secFeatureType &&
            x.allow; })[0] : undefined;
        if (up !== undefined)
            return true;
        // if the user does not have explicit permission we need to check that the permissiob being requested exists in the database
        // this will enable things like competitions to be visible because they do not currently have values in the FeaturePermissions table
        var noPermissionSet = this.allFeatures ? this.allFeatures.filter(function (x) { return x.uri.toLowerCase() === uri.toLowerCase() &&
            x.httpVerb.toLowerCase() === httpVerb.toLowerCase() &&
            x.secFeatureType == secFeatureType; })[0] : undefined;
        return noPermissionSet === undefined;
    };
    PermissionService.prototype.setupBaseNavMenu = function () {
        var options = [new navmenuclasses_1.NavMenuOption('Dashboard', '/home', { activeLink: true })];
        if (this.hasPermission('/Feed', 'Get'))
            options.push(new navmenuclasses_1.NavMenuOption('Content', '/feed'));
        if (this.hasPermission('/LeaderBoardData', 'Get'))
            options.push(new navmenuclasses_1.NavMenuOption('Reports', '/reports', { routerLinkActiveOptions: { exact: false } }));
        if (this.hasPermission('/Competitions', 'Get'))
            options.push(new navmenuclasses_1.NavMenuOption('Competition Management', '/competitions', { routerLinkActiveOptions: { exact: false } }));
        if (this.hasPermission('/UserTemplate', 'Get'))
            options.push(new navmenuclasses_1.NavMenuOption('Accounts', '/useraccountmanagement', { routerLinkActiveOptions: { exact: false } }));
        if (this.hasPermission('/BrandingConfigurations', 'Get'))
            options.push(new navmenuclasses_1.NavMenuOption('Branding', '/branding', { routerLinkActiveOptions: { exact: false } }));
        this.shareService.updateMainNavMenu(options, '', true);
    };
    PermissionService.prototype.getCrudPermissions = function (uri) {
        return new CommonOperationPermissions(this.hasPermission(uri, 'Get'), this.hasPermission(uri, 'Post'), this.hasPermission(uri, 'Put') || this.hasPermission(uri, 'Patch'), this.hasPermission(uri, 'Delete'), this.hasPermission(uri, 'Get'), this.hasPermission(uri, 'Get'));
    };
    return PermissionService;
}());
PermissionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [shareservice_1.ShareService,
        entitypermissiondataservice_1.EntityPermissionDataService,
        securityfeaturedataservice_1.SecurityFeatureDataService])
], PermissionService);
exports.PermissionService = PermissionService;
var CommonOperationPermissions = (function () {
    function CommonOperationPermissions(canGet, canCreate, canEdit, canDelete, canCopyToMarket, canPublishToLive) {
        if (canGet === void 0) { canGet = false; }
        if (canCreate === void 0) { canCreate = false; }
        if (canEdit === void 0) { canEdit = false; }
        if (canDelete === void 0) { canDelete = false; }
        if (canCopyToMarket === void 0) { canCopyToMarket = false; }
        if (canPublishToLive === void 0) { canPublishToLive = false; }
        this.canGet = canGet;
        this.canCreate = canCreate;
        this.canEdit = canEdit;
        this.canDelete = canDelete;
        this.canCopyToMarket = canCopyToMarket;
        this.canPublishToLive = canPublishToLive;
    }
    return CommonOperationPermissions;
}());
exports.CommonOperationPermissions = CommonOperationPermissions;
//# sourceMappingURL=permissionservice.js.map