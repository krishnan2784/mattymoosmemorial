import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {BaseModel} from "../../../models/baseclasses";
import {IDeleteModelDataService} from "../../../contracts/services/IDeleteModelDataService";


@Component({
  selector: 'model-delete',
  templateUrl: 'deletemodel.component.html'
})
export class DeleteModel {
  public id: number;
  public name: string;
  public dataService: IDeleteModelDataService;
  constructor( @Inject(MAT_DIALOG_DATA) public data: { id: number, name: string, service: IDeleteModelDataService},
    public dialogRef: MatDialogRef<DeleteModel>) {
    this.id = data.id;
    this.name = data.name;
    this.dataService = data.service;
  }

  closeDialog(deleteItem: boolean = false) {
    if (deleteItem)
      this.dataService.deleteItem(this.id).subscribe((result) => {
        if (result)
          this.dialogRef.close(true);
        else
          this.dialogRef.close(false);
      });
    else
      this.dialogRef.close(false);
  }
}
