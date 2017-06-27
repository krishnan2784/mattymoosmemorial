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
var UserAccountManagementComponent = (function (_super) {
    __extends(UserAccountManagementComponent, _super);
    function UserAccountManagementComponent(sharedService, userDataService) {
        var _this = _super.call(this, sharedService, 'Account Management', true) || this;
        _this.sharedService = sharedService;
        _this.userDataService = userDataService;
        _this.rows = [];
        _this.columns = [
            { title: 'First Name', name: 'firstName' },
            { title: 'Last Name', name: 'lastName' },
            { title: 'Email', name: 'email' },
            { title: 'Dealership Code', name: 'dealershipCode' },
            { title: '', name: 'actionEdit', sort: false, className: 'col-action' },
            { title: '', name: 'actionDelete', sort: false, className: 'col-action' }
            //{
            //    title: 'Position',
            //    name: 'position',
            //    sort: false,
            //    filtering: { filterString: '', placeholder: 'Filter by position' }
            //},
            //{ title: 'Office', className: ['office-header', 'text-success'], name: 'office', sort: 'asc' },
            //{ title: 'Extn.', name: 'ext', sort: '', filtering: { filterString: '', placeholder: 'Filter by extn.' } },
            //{ title: 'Start date', className: 'text-warning', name: 'startDate' },
            //{ title: 'Salary ($)', name: 'salary' }
        ];
        _this.page = 1;
        _this.itemsPerPage = 20;
        _this.maxSize = 5;
        _this.numPages = 1;
        _this.length = 0;
        _this.config = {
            paging: true,
            sorting: { columns: _this.columns },
            filtering: { filterString: '' },
            className: ['table-bordered', 'table-hover']
        };
        _this.getData();
        return _this;
    }
    UserAccountManagementComponent.prototype.getData = function () {
        var _this = this;
        this.userDataService.getUsers().subscribe(function (result) {
            _this.userAccounts = result;
            if (result) {
                for (var i = 0; i < result.length; i++) {
                    _this.userAccounts[i].actionEdit = '<a class="action-btn remove"><i class="material-icons">edit</i><p>Edit</p></a>';
                    _this.userAccounts[i].actionDelete = '<a class="action-btn remove"><i class="material-icons">delete</i><p>Delete</p></a>';
                }
            }
            _this.length = _this.userAccounts.length;
            _this.onChangeTable(_this.config);
        });
    };
    UserAccountManagementComponent.prototype.ngOnInit = function () {
    };
    UserAccountManagementComponent.prototype.changePage = function (page, data) {
        if (data === void 0) { data = this.userAccounts; }
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
        var _this = this;
        var filteredData = data;
        var lowerFilter = this.config.filtering.filterString.toLowerCase();
        this.columns.forEach(function (column) {
            if (column.filtering) {
                filteredData = filteredData.filter(function (item) {
                    return item[column.name].toLowerCase().match(lowerFilter);
                });
            }
        });
        if (!config.filtering) {
            return filteredData;
        }
        if (config.filtering.columnName) {
            return filteredData.filter(function (item) {
                return item[config.filtering.columnName].toLowerCase().match(lowerFilter);
            });
        }
        var tempArray = [];
        filteredData.forEach(function (item) {
            var flag = false;
            _this.columns.forEach(function (column) {
                if (item[column.name] && item[column.name].toString().toLowerCase().match(lowerFilter)) {
                    flag = true;
                }
            });
            if (flag) {
                tempArray.push(item);
            }
        });
        filteredData = tempArray;
        return filteredData;
    };
    UserAccountManagementComponent.prototype.onChangeTable = function (config, page) {
        if (page === void 0) { page = { page: this.page, itemsPerPage: this.itemsPerPage }; }
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }
        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }
        var filteredData = this.changeFilter(this.userAccounts, this.config);
        var sortedData = this.changeSort(filteredData, this.config);
        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    };
    UserAccountManagementComponent.prototype.onCellClick = function (data) {
        if (data.column === 'actionEdit') {
            this.editUser(data.row);
        }
        else if (data.column === 'actionDelete') {
            console.log(data.row.id);
        }
    };
    UserAccountManagementComponent.prototype.editUser = function (user) {
        if (user === void 0) { user = new userclasses_1.UserAccount(); }
        user = new userclasses_1.UserAccount(user);
        console.log(user);
    };
    return UserAccountManagementComponent;
}(base_component_1.BaseComponent));
UserAccountManagementComponent = __decorate([
    core_1.Component({
        selector: 'useraccountmanagement',
        template: require('./useraccountmanagement.component.html'),
        styles: [require('./useraccountmanagement.component.css')]
    }),
    __metadata("design:paramtypes", [shareservice_1.ShareService, userdataservice_1.UserDataService])
], UserAccountManagementComponent);
exports.UserAccountManagementComponent = UserAccountManagementComponent;
//# sourceMappingURL=useraccountmanagement.component.js.map