import { Component, EventEmitter } from '@angular/core';
import { MarketDataService } from "../../dataservices/marketdataservice";
import Userclasses = require("../../models/userclasses");
import UserMarket = Userclasses.UserMarket;
import { ShareService } from "../../dataservices/datashareservice";
import { UserDataService } from "../../dataservices/userdataservice";

@Component({
    selector: 'marketdropdown',
    template: require('./marketdropdown.component.html'),
    styles: [require('./marketdropdown.component.css')]
})
export class MarketDropdown {
    public currentMarket: UserMarket;
    public marketUpdated = new EventEmitter();
    public userMarkets: UserMarket[] = [];

    constructor(public marketDataService: MarketDataService, private userDataService: UserDataService,
        private sharedService: ShareService) {
        this.userDataService.getUserMarkets().subscribe((result) => {
            this.userMarkets = result;
            this.setCurrentMarketId();
        });
    }

    setCurrentMarketId() {
        this.marketDataService.getCurrentMarketId().subscribe((result) => {
            if (this.userMarkets!=null) {
                this.currentMarket = this.userMarkets.find(x => x.id === result);
            }
        });
    }

    updateCurrentMarket(newMarket: UserMarket) {
        this.currentMarket = this.userMarkets.find(x=> x == newMarket);
        this.marketDataService.updateCurrentMarketUd(this.currentMarket.id).subscribe((result) => {
            if (result) {
                this.sharedService.updateMarketId(this.currentMarket.id);
            }
        });
    }
    
}
