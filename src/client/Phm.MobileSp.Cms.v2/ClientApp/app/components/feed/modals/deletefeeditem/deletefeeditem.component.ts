import {Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FeedDataService} from "../../../../shared/services/feeddataservice";
import {IFeedItem} from "../../../../contracts/models/IFeedModel";

@Component({
  selector: 'feeditem-delete',
  templateUrl: 'deletefeeditem.component.html'
})
export class FeedItemDelete {
  public feedItem: IFeedItem;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FeedItemDelete>,
    public feedDataService: FeedDataService) {
    this.feedItem = data.feedItem;
  }

  closeDialog(deleteItem: boolean = false) {
    if (deleteItem)
      this.feedDataService.deleteFeeditem(this.feedItem.id).subscribe((result) => {
        if (result)
          this.dialogRef.close(true);
        else
          this.dialogRef.close(false);
      });
    else
      this.dialogRef.close(false);
  }
}
