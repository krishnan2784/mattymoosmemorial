import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UserDataService} from "../../../../shared/services/userdataservice";
import {UserTemplate} from "../../../../models/userclasses";

@Component({
  selector: 'user-delete',
  templateUrl: 'deleteuser.component.html'
})
export class UserDelete {
  public user: UserTemplate;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserDelete>,
    public userDataService: UserDataService) {
    this.user = data.user;
  }

  closeDialog(deleteItem: boolean = false) {
    if (deleteItem)
      this.userDataService.deleteUser(this.user.id).subscribe((result) => {
        if (result)
          this.dialogRef.close(true);
        else
          this.dialogRef.close(false);
      });
    else
      this.dialogRef.close(false);
  }
}
