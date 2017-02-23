import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'useraccountmanagement',
    template: require('./useraccountmanagement.component.html')
})
export class UserAccountManagementComponent {
    public userAccounts: IUserAccount[];

    constructor(http: Http) {
        http.get('/api/AccountManagement/UserList').subscribe(result => {
            this.userAccounts = result.json();
        });
    }
}

interface IUserAccount {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    role: string;
    dealer: string;
    market: string;
    createdDate: Date;
}
