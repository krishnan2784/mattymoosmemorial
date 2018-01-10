import { Component, Input } from '@angular/core';
import {UserService} from "../../../shared/_templateBackup/user.service";
import {User} from "../../../models/userclasses";


@Component({
    selector: 'user-detail',
    templateUrl: './user-detail.component.html'
})
export class UserDetailComponent {
    @Input() user: User;

    constructor(private userService: UserService) { }


    updateUser(user) {
        this.userService.updateUser(user).subscribe(result => {
            console.log('Put user result: ', result);
        }, error => {
            console.log(`There was an issue. ${error._body}.`);
        });
    }
}
