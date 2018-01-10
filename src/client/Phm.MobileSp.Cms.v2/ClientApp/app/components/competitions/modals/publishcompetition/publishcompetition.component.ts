import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {Competition} from "../../../../models/competitionclasses";
import {CompetitionsDataService} from "../../../../shared/services/competitionsdataservice";

@Component({
  selector: 'competition-publish',
  templateUrl: 'publishcompetition.component.html'
})
export class CompetitionPublish {
  public model: Competition;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CompetitionPublish>,
    public competitionDataService: CompetitionsDataService) {
    this.model = data.model;
  }

  closeDialog(publishItem: boolean = false) {
    if (publishItem)
      this.competitionDataService.publishContentToLive(this.model.id).subscribe((result) => {
        if (result)
          this.dialogRef.close(true);
        else
          this.dialogRef.close(false);
      });
    else
      this.dialogRef.close(false);
  }
}
