import { Component } from '@angular/core';
import { Http } from '@angular/http';
import UserAccount = require("../../interfaces/models/IUserAccount");
import { BaseComponent } from "../base.component";
import { ShareService } from "../../dataservices/datashareservice";
import { UserDataService } from "../../dataservices/userdataservice";

@Component({
    selector: 'useraccountmanagement',
    template: require('./useraccountmanagement.component.html'),
    styles: [require('./useraccountmanagement.component.css')]
})
export class UserAccountManagementComponent extends BaseComponent {
    public userAccounts: UserAccount.IUserAccount[];
    
    constructor(public sharedService: ShareService, public userDataService: UserDataService) {
        super(sharedService, 'Account Management', true);
        this.getData();
    }

    getData() {
        this.userDataService.getUsers().subscribe((result) => {
            this.userAccounts = result;
        });
    }
}


