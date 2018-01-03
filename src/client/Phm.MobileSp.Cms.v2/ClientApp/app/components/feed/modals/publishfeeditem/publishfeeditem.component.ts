import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FeedDataService} from "../../../../shared/services/feeddataservice";
import {IFeedItem} from "../../../../contracts/models/IFeedModel";

@Component({
  selector: 'feeditem-publish',
  templateUrl: 'publishfeeditem.component.html'
})
export class FeedItemPublish {
  public feedItem: IFeedItem;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FeedItemPublish>,
    public feedDataService: FeedDataService) {
    this.feedItem = data.feedItem;
  }

  closeDialog(publishItem: boolean = false) {
    if (publishItem)
      this.feedDataService.publishContentToLive(this.feedItem.id).subscribe((result) => {
        if (result)
          this.dialogRef.close(true);
        else
          this.dialogRef.close(false);
      });
    else
      this.dialogRef.close(false);
  }
}
