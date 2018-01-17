import { Component } from '@angular/core';
import { BaseComponent } from "../../base.component";
import { MatDialog } from "@angular/material";
import {UserFilters} from "../../../components/common/filters/userfilter/userfilter.component";
import { CommonOperationPermissions, PermissionService } from '../../../shared/services/helpers/permissionservice';
import { ShareService } from '../../../shared/services/helpers/shareservice';
import {UserDataService} from "../../../shared/services/userdataservice";
import {DefaultTabNavs} from "../../../components/navigation/tabbednavmenu/tabnavmenu.component";
import {StringEx} from "../../../classes/helpers/string";
import {UserTemplate} from "../../../models/userclasses";
import {EditUser} from "../../../components/accountmanagement/modals/edituser/edituser.component";
import {UserDelete} from "../../../components/accountmanagement/modals/deleteuser/deleteuser.component";
import {MarketDataService} from "../../../shared/services/marketdataservice";
import {GenericFilterSet, DefaultFilterSets, CheckboxFilter, GenericFilter, StringFilter } from "../../../components/common/filters/generic/genericfilter.component";


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
    regions: Array<string>;
    zones: Array<string>;
    dealershipNames: Array<string>;
    dealershipCodes: Array<string>;

    userFilters: GenericFilterSet = DefaultFilterSets.userFilters;

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
    public confirmBox: MatDialog, public marketDataService: MarketDataService) {
		super(sharedService, 'Account Management', true, '', DefaultTabNavs.accountManagementTabs);
        this.setupSubscriptions();
        this.getData();

        this.userPermissions = permissionService.getCrudPermissions('/UserTemplate');
    }

  public ngOnInit(): void {
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
      this.getFilterData();
    }


  getFilterData() {
    this.marketDataService.getMarketUserFilters().subscribe((result) => {
      if (result) {
        this.dealershipNames = new Array();
        result.dealershipNames.forEach((x) => {
          this.dealershipNames.push(x);
        });
        this.dealershipCodes = new Array();
        result.dealershipCodes.forEach((x) => {
          this.dealershipCodes.push(x);
        });
        this.zones = new Array();
        result.zones.forEach((x) => {
          this.zones.push(x);
        });
        this.regions = new Array();
        result.regions.forEach((x) => {
          this.regions.push(x);
        });
        this.updateFilters('Zone', result.zones);
        this.updateFilters('Region', result.regions);
      }
    });
  }

  updateFilters(name:string, values:string[]) {
    var cf =
      this.userFilters.filterGroups[1].filters.filter(x => x.filterName === name)[0] as CheckboxFilter;
    cf.setValues(values);
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
  
    public onChangeTable(config: any, page: any = { page: this.page, itemsPerPage: this.itemsPerPage }): any {
        if (config.filtering) {
            Object.assign(this.config.filtering, config.filtering);
        }

        if (config.sorting) {
            Object.assign(this.config.sorting, config.sorting);
        }

        let sortedData = this.changeSort(this.filteredUserAccounts, this.config);

        this.rows = page && config.paging ? this.changePage(page, sortedData) : sortedData;
        this.length = sortedData.length;
    }

    public editUser(user: UserTemplate = new UserTemplate()) {
        user = new UserTemplate(user);
        let data = {
          model: user,
          title: user.id === 0 ? 'Create User' : 'Edit User',
          roles: this.roles,
          dealershipNames: this.dealershipNames,
          dealershipCodes: this.dealershipCodes,
          zones: this.zones,
          regions: this.regions
        };

        let dialogRef = this.confirmBox.open(EditUser, {
          width: '500px',
          data: data,
          disableClose : false
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result)
            this.updateUser(user);
        });
    }

    public deleteUser(user: UserTemplate = new UserTemplate()) {
      let dialogRef = this.confirmBox.open(UserDelete, {
        width: '250px',
        data: { user: user }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result)
          this.updateUser(user);
      });
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

    filterUpdate(filters: GenericFilter[]) {
      var data = Object.assign([], this.allUserAccounts);
      if (filters.length > 0) {

        var sFilter = filters.filter(x => x.filterName === 'search')[0] as StringFilter;
        if (sFilter) {
          data = StringEx.searchArray(sFilter.value.toLowerCase(), data, ['firstName', 'lastName', 'email', 'regionName', 'zoneName', 'dealershipName', 'dealershipCode']);
        }

        var zFilter = filters.filter(x => x.filterName === 'Zone')[0] as CheckboxFilter;
        if (zFilter) {
          data = data.filter(x => zFilter.values.filter(y => y.name === x.zoneName).length > 0);
        }

        var rFilter = filters.filter(x => x.filterName === 'Region')[0] as CheckboxFilter;
        if (rFilter) {
          data = data.filter(x => rFilter.values.filter(y => y.name === x.regionName).length > 0);
        }
      }

      this.filteredUserAccounts = data;
      this.onChangeTable(this.config);
    }
}
