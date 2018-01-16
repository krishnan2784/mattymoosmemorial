import {Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {CopiedElementTypeEnum} from "../../../../enums";
import {IMarketContentService} from "../../../contracts/services/IMarketContentService";
import { UserDataService } from '../../../shared/services/userdataservice';
import {ShareService} from "../../../shared/services/helpers/shareservice";
import {MarketDataService} from "../../../shared/services/marketdataservice";
import {ContentMarket} from "../../../models/userclasses";


@Component({
  selector: 'copytomarket',
  templateUrl: 'copytomarket.component.html',
  styles: [require('./copytomarket.component.css')]
})
export class CopyToMarket {
  model;
  contentType: CopiedElementTypeEnum;
  marketContentService: IMarketContentService;
  modalId: string;
  modalHeader: string;

  userMarkets: ContentMarket[] = [];
  currentMarkets: ContentMarket[] = [];

  selectedUserMarket: ContentMarket;
  selectedMarket: ContentMarket;

  unsavedChanges: boolean = false;
  loading: boolean = false;

  constructor( @Inject(MAT_DIALOG_DATA) public data: {model, contentType: CopiedElementTypeEnum, marketContentService: IMarketContentService,
    modalId: string, modalHeader: string}, public dialogRef: MatDialogRef<CopyToMarket>, private sharedService: ShareService,
    private marketService: MarketDataService, private userDataService: UserDataService) {
      this.model = data.model;
      this.contentType = data.contentType;
      this.marketContentService = data.marketContentService;
      this.modalId = data.modalId;
      this.modalHeader = data.modalHeader;
  }

  ngOnInit() {
    this.setupMarkets();
  }

  setupMarkets() {
    let id: any = this.contentType !== CopiedElementTypeEnum.Feed ? this.model.id : this.model.masterId;
    this.marketContentService.getMarketsByContentId(id).subscribe((result) => {
      if (result && result.length > 0) {
        this.currentMarkets = this.filterMarkets(result.map((x) => { return new ContentMarket(x); }));
        this.markMarketsAsCopied();
      }
      this.userDataService.getUserMarkets().subscribe((result) => {
        if (result && result.length > 0) {
          if (this.currentMarkets && this.currentMarkets.length > 0)
            result = result.filter(x => this.currentMarkets.filter(y => y.id === x.id).length === 0);
          result = result.filter(x => !x.isLive);
          this.userMarkets = this.filterMarkets(result.map((x) => { return new ContentMarket(x); }));
        }
      });
    });
  }

  filterMarkets(markets: ContentMarket[]): ContentMarket[] {
    // we will need to filter Global and Pan EU out when viewing the Pan EU market
    // and filter out Global when viewing the global market
    // we could add a market level integer to the market (e.g. 0 = global, 1 = regional, 2 = market)
    // or we could add an isGlobal flag
    if (this.sharedService.currentMarket.isMaster) {
      // markets = markets.filter(x => !x.isMaster);
    }
    markets = markets.filter(x => x.id !== this.sharedService.currentMarket.id);
    return markets;
  }

  markMarketsAsCopied() {
    for (let x of this.currentMarkets) {
      let origItem = this.currentMarkets.find(y => y.id === x.id);
      let index = this.currentMarkets.indexOf(origItem);
      this.currentMarkets[index].isCopied = true;
    }
    this.checkForChanges();
  }

  copyToMarket() {
    if (this.selectedUserMarket[0] && this.currentMarkets.filter(x => x.id === this.selectedUserMarket[0].id).length === 0) {
      this.currentMarkets.push(new ContentMarket(this.selectedUserMarket[0]));
      let origItem = this.userMarkets.find(x => x.id === this.selectedUserMarket[0].id);
      let index = this.userMarkets.indexOf(origItem);
      this.userMarkets.splice(index, 1);
      this.checkForChanges();
    }
  }

  removeFromMarket() {
    if (this.selectedMarket[0] && !this.selectedMarket[0].isCopied &&
      this.userMarkets.filter(x => x.id === this.selectedMarket[0].id).length === 0) {
      this.userMarkets.push(new ContentMarket(this.selectedMarket[0]));
      let origItem = this.currentMarkets.find(x => x.id === this.selectedMarket[0].id);
      let index = this.currentMarkets.indexOf(origItem);
      this.currentMarkets.splice(index, 1);
      this.checkForChanges();
    }
  }

  checkForChanges() { this.unsavedChanges = this.currentMarkets.filter(x => !x.isCopied).length > 0; }

  saveChanges() {
    this.loading = true;
    var marketIds = this.currentMarkets.map((x) => { return x.id; });
    this.marketContentService.copyContentToMarket(this.model.id, marketIds).subscribe((result) => {
      if (result.success) 
        this.dialogRef.close(true);
      else
        this.dialogRef.close(false);
      this.loading = false;
    });
  }
}
