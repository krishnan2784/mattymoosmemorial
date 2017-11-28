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
var base_component_1 = require("../base.component");
var shareservice_1 = require("../../services/helpers/shareservice");
var userdataservice_1 = require("../../services/userdataservice");
var userclasses_1 = require("../../models/userclasses");
var Editusercomponent = require("./modals/edituser.component");
var EditUser = Editusercomponent.EditUser;
var Userfiltercomponent = require("../common/filters/userfilter.component");
var UserFilters = Userfiltercomponent.UserFilters;
var angular2_modal_1 = require("angular2-modal");
var bootstrap_1 = require("angular2-modal/plugins/bootstrap");
var String1 = require("../../classes/helpers/string");
var StringEx = String1.StringEx;
var tabnavmenu_component_1 = require("../navmenu/tabnavmenu.component");
var permissionservice_1 = require("../../services/helpers/permissionservice");
var UserAccountManagementComponent = (function (_super) {
    __extends(UserAccountManagementComponent, _super);
    function UserAccountManagementComponent(sharedService, userDataService, permissionService, overlay, vcRef, confirmBox) {
        var _this = _super.call(this, sharedService, 'Account Management', true, '', tabnavmenu_component_1.DefaultTabNavs.accountManagementTabs) || this;
        _this.sharedService = sharedService;
        _this.userDataService = userDataService;
        _this.permissionService = permissionService;
        _this.confirmBox = confirmBox;
        _this.modalData = null;
        _this.filterCriteria = new UserFilters();
        _this.refreshFilters = false;
        _this.rows = [];
        _this.columns = [
            { title: '', name: 'userAvatar' },
            { title: 'First Name', name: 'firstName_region' },
            { title: 'Last Name', name: 'lastName' },
            { title: 'Email', name: 'email_zone' },
            { title: 'Dealership', name: 'dealershipName_code' },
            { title: '', name: 'actionEdit', sort: false, className: 'col-action' }
            //,{ title: '', name: 'actionDelete', sort: false, className: 'col-action' }
        ];
        _this.page = 1;
        _this.itemsPerPage = 20;
        _this.maxSize = 5;
        _this.numPages = 1;
        _this.length = 0;
        _this.config = {
            paging: true,
            sorting: { columns: _this.columns },
            filtering: {
                filterString: '',
                'zone': '%' + _this.filterCriteria.zoneFilters.map(function (x) { return x.text; }).join('%') + '%',
                'region': '%' + _this.filterCriteria.regionFilters.map(function (x) { return x.text; }).join('%') + '%'
            },
            className: ['table-bordered', 'table-hover']
        };
        overlay.defaultViewContainer = vcRef;
        _this.setupSubscriptions();
        _this.getData();
        _this.userPermissions = permissionService.getCrudPermissions('/UserTemplate');
        return _this;
    }
    UserAccountManagementComponent.prototype.getData = function () {
        var _this = this;
        this.userDataService.getUsers().subscribe(function (result) {
            _this.allUserAccounts = result;
            if (result) {
            }
            else
                _this.allUserAccounts = [];
            _this.length = _this.allUserAccounts.length;
            _this.filteredUserAccounts = _this.allUserAccounts;
            _this.onChangeTable(_this.config);
            _this.sharedService.updateMarketDropdownEnabledState(true);
        });
        this.userDataService.getUserGroups().subscribe(function (result) {
            if (result) {
                _this.roles = [];
                result.forEach(function (role) {
                    _this.roles.push({ id: role.id, name: role.name });
                });
            }
        });
    };
    UserAccountManagementComponent.prototype.ngOnInit = function () {
    };
    UserAccountManagementComponent.prototype.setupSubscriptions = function () {
        var _this = this;
        this.sharedService.marketUpdated.subscribe(function (market) {
            _this.filteredUserAccounts = null;
            _this.getData();
        });
    };
    UserAccountManagementComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.filteredUserAccounts; }
        var start = (page.page - 1) * page.itemsPerPage;
        var end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    };
    UserAccountManagementComponent.prototype.changeSort = function (data, config) {
        if (!config.sorting) {
            return data;
        }
        var columns = this.config.sorting.columns || [];
        var columnName = void 0;
        var sort = void 0;
        for (var i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }
        if (!columnName) {
            return data;
        }
        return data.sort(function (previous, current) {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            }
            else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    };
    UserAccountManagementComponent.prototype.changeFilter = function (data, config) {
        return StringEx.searchArray(this.config.filtering.filterString.toLowerCase(), data, ['firstName', 'lastName', 'email', 'regionName', 'zoneName', 'dealershipName', 'dealershipCode']);
    };
    UserAccountManagementComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.filteredUserAccounts, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    UserAccountManagementComponent.prototype.editUser = function (user) {
        if (user === void 0) { user = new userclasses_1.UserTemplate(); }
        user = new userclasses_1.UserTemplate(user);
        var inputs = { model: user, title: user.id === 0 ? 'Create User' : 'Edit User', roles: this.roles };
        var modelData = EditUser;
        this.modalData = {
            modalContent: modelData,
            inputs: inputs
        };
    };
    UserAccountManagementComponent.prototype.deleteUser = function (user) {
        if (user === void 0) { user = new userclasses_1.UserTemplate(); }
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Delete')
            .body("Are you sure you want to delete " + user.firstName + " " + user.lastName + "?")
            .okBtn('Confirm')
            .cancelBtn('Cancel')
            .open()
            .catch(function (err) { return console.log('ERROR: ' + err); })
            .then(function (dialog) { return dialog.result; })
            .then(function (result) {
            console.log(user);
        })
            .catch(function (err) { });
    };
    UserAccountManagementComponent.prototype.updateUser = function (user) {
        if (user != null) {
            if (this.allUserAccounts != null) {
                var originalUser = this.allUserAccounts.find(function (x) { return x.id === user.id; });
                var index = this.allUserAccounts.indexOf(originalUser);
                if (index > -1)
                    this.allUserAccounts.splice(index, 1, user);
                else
                    this.allUserAccounts.unshift(user);
            }
            var data = Object.assign([], this.allUserAccounts);
            this.filteredUserAccounts = data;
            this.onChangeTable(this.config);
            this.refreshFilters = true;
        }
    };
    UserAccountManagementComponent.prototype.filterUpdate = function (criteria) {
        var _this = this;
        this.filterCriteria = criteria;
        var data = Object.assign([], this.allUserAccounts);
        if (this.filterCriteria.zoneFilters.length > 0)
            data = data.filter(function (x) { return _this.filterCriteria.zoneFilters.filter(function (y) { return y.text === x.zoneName; }).length > 0; });
        if (this.filterCriteria.regionFilters.length > 0)
            data = data.filter(function (x) { return _this.filterCriteria.regionFilters.filter(function (y) { return y.text === x.regionName; }).length > 0; });
        this.filteredUserAccounts = data;
        this.config.filtering.filterString = criteria.searchString;
        this.onChangeTable(this.config);
    };
    return UserAccountManagementComponent;
}(base_component_1.BaseComponent));
UserAccountManagementComponent = __decorate([
    core_1.Component({
        selector: 'useraccountmanagement',
        template: require('./useraccountmanagement.component.html'),
        styles: [require('./useraccountmanagement.component.css')]
    }),
    __metadata("design:paramtypes", [shareservice_1.ShareService, userdataservice_1.UserDataService, permissionservice_1.PermissionService,
        angular2_modal_1.Overlay, core_1.ViewContainerRef, bootstrap_1.Modal])
], UserAccountManagementComponent);
exports.UserAccountManagementComponent = UserAccountManagementComponent;
//# sourceMappingURL=useraccountmanagement.component.js.map