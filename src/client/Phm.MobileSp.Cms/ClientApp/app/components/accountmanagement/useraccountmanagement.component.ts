import { Component, OnInit, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { BaseComponent } from "../base.component";
import { ShareService } from "../../services/helpers/shareservice";
import { UserDataService } from "../../services/userdataservice";
import { UserAccount } from "../../models/userclasses";
import Editusercomponent = require("./modals/edituser.component");
import EditUser = Editusercomponent.EditUser;
import FeedModel = require("../../interfaces/models/IFeedModel");
import IFeedItem = FeedModel.IFeedItem;

@Component({
    selector: 'useraccountmanagement',
    template: require('./useraccountmanagement.component.html'),
    styles: [require('./useraccountmanagement.component.css')]
})
export class UserAccountManagementComponent extends BaseComponent {
    modalData = null;


    public rows: Array<any> = [];
    public columns: Array<any> = [
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
    public page: number = 1;
    public itemsPerPage: number = 20;
    public maxSize: number = 5;
    public numPages: number = 1;
    public length: number = 0;
    
    public config: any = {
        paging: true,
        sorting: { columns: this.columns },
        filtering: { filterString: '' },
        className: ['table-bordered','table-hover']
    };

    private userAccounts: Array<any>;

    constructor(public sharedService: ShareService, public userDataService: UserDataService) {
        super(sharedService, 'Account Management', true);
        this.getData();
    }

    getData() {
        this.userDataService.getUsers().subscribe((result) => {
            this.userAccounts = result;

            if (result) {
                for (let i = 0; i < result.length; i++) {
                    this.attachUserEvents(this.userAccounts[i]);
                }
            }

            this.length = this.userAccounts.length;
            this.onChangeTable(this.config);
        });
    }


    public ngOnInit(): void {
    }

    public changePage(page: any, data: Array<any> = this.userAccounts): Array<any> {
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
        let filteredData: Array<any> = data;
        var lowerFilter = this.config.filtering.filterString.toLowerCase();
        this.columns.forEach((column: any) => {
            if (column.filtering) {
                filteredData = filteredData.filter((item: any) => {
                    return item[column.name].toLowerCase().match(lowerFilter);
                });
            }
        });

        if (!config.filtering) {
            return filteredData;
        }

        if (config.filtering.columnName) {
            return filteredData.filter((item: any) =>
                item[config.filtering.columnName].toLowerCase().match(lowerFilter));
        }

        let tempArray: Array<any> = [];
        filteredData.forEach((item: any) => {
            let flag = false;
            this.columns.forEach((column: any) => {
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
    }

    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let filteredData = this.changeFilter(this.userAccounts, this.config);
        let sortedData = this.changeSort(filteredData, this.config);

        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }

    public onCellClick(data: any): any {
        if (data.column === 'actionEdit') {
            this.editUser(data.row);
        } else if (data.column === 'actionDelete') {
            console.log(data.row.id);
        }
    }

    public editUser(user: UserAccount = new UserAccount()) {
        user = new UserAccount(user);
        let inputs = { model: user, title: user.id === 0 ? 'Create User' : 'Edit User' };
        var modelData = EditUser;

        this.modalData = {
            modalContent: modelData,
            inputs: inputs
        };
    }

    public updateUser(user: UserAccount) {
        this.attachUserEvents(user);
        var index = this.userAccounts.indexOf(user);
        if (index > -1) 
            this.userAccounts.splice(index, 1, user);
         else
            this.userAccounts.unshift(user);
    }

    public attachUserEvents(user: any) {
        user.actionEdit = '<a class="action-btn remove" data-toggle="modal" data-target="#edit-user"><i class="material-icons">edit</i><p>Edit</p></a>';
        user.actionDelete = '<a class="action-btn remove"><i class="material-icons">delete</i><p>Delete</p></a>';
        return user;
    }
}