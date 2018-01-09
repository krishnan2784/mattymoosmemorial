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
var shareservice_1 = require("../services/helpers/shareservice");
var permissionservice_1 = require("../services/helpers/permissionservice");
var base_component_1 = require("./base.component");
var IndexComponent = (function (_super) {
    __extends(IndexComponent, _super);
    function IndexComponent(sharedService, permissionService, pageTitle, marketDropdownVisiblity, goBackText, tabNavItems, pageKey) {
        if (goBackText === void 0) { goBackText = ''; }
        if (tabNavItems === void 0) { tabNavItems = []; }
        if (pageKey === void 0) { pageKey = ''; }
        var _this = _super.call(this, sharedService, pageTitle, marketDropdownVisiblity, goBackText, tabNavItems) || this;
        _this.sharedService = sharedService;
        _this.permissionService = permissionService;
        _this.pageKey = pageKey;
        _this.userPermissions = new permissionservice_1.CommonOperationPermissions();
        _this.userPermissions = permissionService.getCrudPermissions(_this.pageKey);
        sharedService.permissionsUpdated.subscribe(function () {
            _this.userPermissions = _this.permissionService.getCrudPermissions(pageKey);
        });
        return _this;
    }
    return IndexComponent;
}(base_component_1.BaseComponent));
IndexComponent = __decorate([
    core_1.Component({
        template: ''
    }),
    __metadata("design:paramtypes", [shareservice_1.ShareService, permissionservice_1.PermissionService, String, Boolean, String, Array, Object])
], IndexComponent);
exports.IndexComponent = IndexComponent;
//# sourceMappingURL=index.component.js.map