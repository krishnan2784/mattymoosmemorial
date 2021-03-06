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
var router_1 = require("@angular/router");
var base_component_1 = require("../../../base.component");
var shareservice_1 = require("../../../../services/helpers/shareservice");
var tabnavmenu_component_1 = require("../../../navmenu/tabnavmenu.component");
var usergrouppermissiondataservice_1 = require("../../../../services/usergrouppermissiondataservice");
var userdataservice_1 = require("../../../../services/userdataservice");
var usergrouppermissionindexviewmodel_1 = require("../../../../models/viewmodels/usergrouppermissionindexviewmodel");
var securityfeaturedataservice_1 = require("../../../../services/securityfeaturedataservice");
var string_1 = require("../../../../classes/helpers/string");
var UserGroupPermissionsIndexComponent = (function (_super) {
    __extends(UserGroupPermissionsIndexComponent, _super);
    function UserGroupPermissionsIndexComponent(route, router, ugPermissionDataService, userDataService, secFeatureDataService, sharedService) {
        var _this = _super.call(this, sharedService, 'Accounts', true, '', tabnavmenu_component_1.DefaultTabNavs.accountManagementTabs) || this;
        _this.route = route;
        _this.router = router;
        _this.ugPermissionDataService = ugPermissionDataService;
        _this.userDataService = userDataService;
        _this.secFeatureDataService = secFeatureDataService;
        _this.selectedSecEntityId = null;
        _this.userMarkets = [];
        _this.marketMasterIds = [];
        _this.currentStep = '';
        _this.loading = true;
        _this.setupSubscriptions();
        _this.setupMarket();
        return _this;
    }
    UserGroupPermissionsIndexComponent.prototype.setupSubscriptions = function () {
        var _this = this;
        this.sharedService.marketUpdated.subscribe(function (market) {
            _this.setupMarket();
        });
    };
    UserGroupPermissionsIndexComponent.prototype.ngOnInit = function () {
    };
    UserGroupPermissionsIndexComponent.prototype.ngOnDestroy = function () {
    };
    UserGroupPermissionsIndexComponent.prototype.getData = function () {
        var _this = this;
        this.marketMasterIds.forEach(function (x) {
            _this.ugPermissionDataService.getUserGroupsByMarketMasterId(x).subscribe(function (result) {
                if (result) {
                    result.forEach(function (z) {
                        var marketGroup = _this.marketUserGroups.filter(function (y) { return y.market.masterId === x; })[0];
                        if (marketGroup)
                            marketGroup.securityGroupUsers
                                .push(new usergrouppermissionindexviewmodel_1.SecurityGroupUsers({ securityGroup: z }));
                        //this.ugPermissionDataService.getSecurityGroupUsers(z.id).subscribe(result => {
                        //	if (result) {
                        //		this.marketUserGroups.filter(y => y.market.masterId === x)[0]
                        //			.securityGroupUsers.filter(yy => yy.securityGroup.id === z.id)[0]
                        //			.users = result;
                        //	}
                        //});
                    });
                }
                else
                    _this.marketUserGroups = [];
                _this.loading = false;
            });
        });
        this.secFeatureDataService.getSecurityFeatures().subscribe(function (x) {
            _this.allSecurityFeatures = (!x || x.length === 0 ? [] : string_1.StringEx.sortArray(x, ['secFeatureType', 'uri', 'httpVerb']).reverse());
        });
    };
    UserGroupPermissionsIndexComponent.prototype.setupMarket = function () {
        if (this.sharedService.currentMarketId === 1) {
            this.setupAllMarkets();
        }
        else {
            this.marketMasterIds = [];
            this.marketMasterIds.push(this.sharedService.currentMarket.masterId);
            this.marketUserGroups = [];
            this.marketUserGroups.push(new usergrouppermissionindexviewmodel_1.MarketUserGroup({ market: this.sharedService.currentMarket }));
            this.getData();
        }
    };
    UserGroupPermissionsIndexComponent.prototype.setupAllMarkets = function () {
        var _this = this;
        if (!this.userMarkets) {
            this.userDataService.getUserMarkets().subscribe(function (result) {
                if (result) {
                    _this.userMarkets = result;
                    _this.setupAllMarkets();
                }
                else
                    _this.userMarkets = [];
            });
            return;
        }
        this.marketMasterIds = [];
        this.userMarkets.forEach(function (x) {
            if (_this.marketMasterIds.findIndex(function (y) { return y === x.masterId; }) === -1) {
                _this.marketMasterIds.push(x.masterId);
                _this.marketUserGroups = [];
                _this.marketUserGroups.push(new usergrouppermissionindexviewmodel_1.MarketUserGroup({ market: x }));
            }
        });
        this.getData();
    };
    UserGroupPermissionsIndexComponent.prototype.editUserGroup = function (securityGroup, editUsers) {
        this.currentStep = editUsers ? 'users' : 'group';
        this.selectedSecEntityId = securityGroup.secEntityId;
        this.updatePageTitle(securityGroup.name);
        this.updateTabNavItems();
        this.updateMarketDropdownVisibility(false);
    };
    UserGroupPermissionsIndexComponent.prototype.permissionsUpdated = function () {
        this.selectedSecEntityId = null;
        this.updateTabNavItems(tabnavmenu_component_1.DefaultTabNavs.accountManagementTabs);
        this.updateMarketDropdownVisibility(true);
        this.currentStep = '';
        this.updatePageTitle('Accounts');
    };
    return UserGroupPermissionsIndexComponent;
}(base_component_1.BaseComponent));
UserGroupPermissionsIndexComponent = __decorate([
    core_1.Component({
        selector: 'usergroupindex',
        template: require('./usergroupindex.component.html'),
        styles: [require('./usergroupindex.component.css')]
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, router_1.Router,
        usergrouppermissiondataservice_1.UserGroupPermissionDataService,
        userdataservice_1.UserDataService,
        securityfeaturedataservice_1.SecurityFeatureDataService,
        shareservice_1.ShareService])
], UserGroupPermissionsIndexComponent);
exports.UserGroupPermissionsIndexComponent = UserGroupPermissionsIndexComponent;
//# sourceMappingURL=usergroupindex.component.js.map