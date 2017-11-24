import { Component, OnInit, EventEmitter, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { BaseComponent } from "../base.component";
import { ShareService } from "../../services/helpers/shareservice";
import { UserDataService } from "../../services/userdataservice";
import { UserAccount, UserTemplate } from "../../models/userclasses";
import Editusercomponent = require("./modals/edituser.component");
import EditUser = Editusercomponent.EditUser;
import FeedModel = require("../../interfaces/models/IFeedModel");
import IFeedItem = FeedModel.IFeedItem;
import Userfiltercomponent = require("../common/filters/userfilter.component");
import UserFilters = Userfiltercomponent.UserFilters;

import { Overlay } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import String1 = require("../../classes/helpers/string");
import StringEx = String1.StringEx;
import {DefaultTabNavs} from "../navmenu/tabnavmenu.component";
import {PermissionService, CommonOperationPermissions } from "../../services/helpers/permissionservice";

@Component({
    selector: 'useraccountmanagement',
    template: require('./useraccountmanagement.component.html'),
    styles: [require('./useraccountmanagement.component.css')]
})
export class UserAccountManagementComponent extends BaseComponent {
    modalData = null;
    filterCriteria: UserFilters = new UserFilters();
    private allUserAccounts: Array<any>;
    private filteredUserAccounts: Array<any>;
    refreshFilters: boolean = false;
    roles: { id: number, name: string }[];

    public rows: Array<any> = [];
    public columns: Array<any> = [
        { title: '', name: 'userAvatar' },
        { title: 'First Name', name: 'firstName_region' },
        { title: 'Last Name', name: 'lastName' },
        { title: 'Email', name: 'email_zone' },
        { title: 'Dealership', name: 'dealershipName_code' },
        { title: '', name: 'actionEdit', sort: false, className: 'col-action' }
        //,{ title: '', name: 'actionDelete', sort: false, className: 'col-action' }
    ];
    public page: number = 1;
    public itemsPerPage: number = 20;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;
	public userPermissions: CommonOperationPermissions;

	public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: {
            filterString: '' ,
            'zone': '%' + this.filterCriteria.zoneFilters.map((x) => { return x.text; }).join('%') + '%',
            'region': '%' + this.filterCriteria.regionFilters.map((x) => { return x.text; }).join('%') + '%'
        },
        className: ['table-bordered','table-hover']
    };

	constructor(public sharedService: ShareService, public userDataService: UserDataService, public permissionService: PermissionService,
		overlay: Overlay, vcRef: ViewContainerRef, public confirmBox: Modal) {
		super(sharedService, 'Account Management', true, '', DefaultTabNavs.accountManagementTabs);
        overlay.defaultViewContainer = vcRef;
        this.setupSubscriptions();
		this.getData();
		this.userPermissions = permissionService.getCrudPermissions('/UserTemplate');

    }

    getData() {
        this.userDataService.getUsers().subscribe((result) => {
            this.allUserAccounts = result;
            if (result) {
            } else
                this.allUserAccounts = [];

            this.length = this.allUserAccounts.length;
            this.filteredUserAccounts = this.allUserAccounts;
            this.onChangeTable(this.config);
            this.sharedService.updateMarketDropdownEnabledState(true);
        });
        this.userDataService.getUserGroups().subscribe((result) => {
            if (result) {
                this.roles = [];
                result.forEach((role) => {
                    this.roles.push({ id: role.id, name: role.name });
                });
            }
        });
    }


    public ngOnInit(): void {
    }

    setupSubscriptions() {
        this.sharedService.marketUpdated.subscribe((market) => {
            this.filteredUserAccounts = null;
            this.getData();
        });
    }

    public changePage(page: any, data: Array<any> = this.filteredUserAccounts): Array<any> {
        let start = (page.page - 1) * page.itemsPerPage;
        let end = page.itemsPerPage > -1 ? (start + page.itemsPerPage) : data.length;
        return data.slice(start, end);
    }

    public changeSort(data: any, config: any): any {
        if (!config.sorting) {
            return data;
        }

        let columns = this.config.sorting.columns || [];
        let columnName: string = void 0;
        let sort: string = void 0;

        for (let i = 0; i < columns.length; i++) {
            if (columns[i].sort !== '' && columns[i].sort !== false) {
                columnName = columns[i].name;
                sort = columns[i].sort;
            }
        }

        if (!columnName) {
            return data;
        }

        return data.sort((previous: any, current: any) => {
            if (previous[columnName] > current[columnName]) {
                return sort === 'desc' ? -1 : 1;
            } else if (previous[columnName] < current[columnName]) {
                return sort === 'asc' ? -1 : 1;
            }
            return 0;
        });
    }

    public changeFilter(data: any, config: any): any {
        return StringEx.searchArray(this.config.filtering.filterString.toLowerCase(), data, ['firstName', 'lastName', 'email', 'regionName', 'zoneName', 'dealershipName', 'dealershipCode']);
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.filteredUserAccounts, this.config);
        let sortedData = this.changeSort(filteredData, this.config);

        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }

    public editUser(user: UserTemplate = new UserTemplate()) {
        user = new UserTemplate(user);
        let inputs = { model: user, title: user.id === 0 ? 'Create User' : 'Edit User', roles: this.roles };
        var modelData = EditUser;

        this.modalData = {
            modalContent: modelData,
            inputs: inputs
        };
    }

    public deleteUser(user: UserTemplate = new UserTemplate()) {
        this.confirmBox.confirm()
            .size('sm')
            .showClose(false)
            .title('Delete')
            .body("Are you sure you want to delete " + user.firstName + " " + user.lastName + "?")
            .okBtn('Confirm')
                .cancelBtn('Cancel')
                .open()
            .catch((err: any) => console.log('ERROR: ' + err))
            .then((dialog: any) => { return dialog.result })
            .then((result: any) => {
                console.log(user);
            })
            .catch((err: any) => { });
    }

    public updateUser(user: UserTemplate) {
        if (user != null) {
            if (this.allUserAccounts != null) {
                let originalUser = this.allUserAccounts.find(x => x.id === user.id);
                let index = this.allUserAccounts.indexOf(originalUser);
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
    }

    filterUpdate(criteria: UserFilters) {
        this.filterCriteria = criteria;
        var data = Object.assign([], this.allUserAccounts);
        if (this.filterCriteria.zoneFilters.length > 0)
            data = data.filter(x => this.filterCriteria.zoneFilters.filter(y => y.text === x.zoneName).length > 0);
        if (this.filterCriteria.regionFilters.length > 0)
            data = data.filter(x => this.filterCriteria.regionFilters.filter(y => y.text === x.regionName).length > 0);

        this.filteredUserAccounts = data;
        this.config.filtering.filterString = criteria.searchString;
        this.onChangeTable(this.config);
    }
}