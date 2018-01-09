import { Component, EventEmitter, Injectable, OnInit, AfterViewInit } from '@angular/core';
import {UserMarket} from "../../models/userclasses";
import {MarketDataService} from "../../shared/services/marketdataservice";
import {UserDataService} from "../../shared/services/userdataservice";
import {ShareService} from "../../shared/services/helpers/shareservice";


@Injectable()
@Component({
    selector: 'marketdropdown',
    template: require('./marketdropdown.component.html'),
    styles: [require('./marketdropdown.component.css')]
})
export class MarketDropdown implements AfterViewInit {
    public currentMarket: UserMarket;
    public marketUpdated = new EventEmitter();
    public userMarkets: UserMarket[] = [];
    public enabled: boolean = true;

    constructor(public marketDataService: MarketDataService, private userDataService: UserDataService,
        private sharedService: ShareService) {
        this.userDataService.getUserMarkets().subscribe((result) => {
            this.userMarkets = result;
            this.setCurrentMarketId();
        });
        this.sharedService.marketDropdownEnabledUpdated.subscribe(enabled => {
            this.enabled = enabled;
        });
    }
    
    ngAfterViewInit() {

    }

    setCurrentMarketId() {
        this.marketDataService.getCurrentMarketId().subscribe((result) => {
            if (this.userMarkets!=null) {
                this.currentMarket = this.userMarkets.find(x => x.id === result);
                this.sharedService.updateMarket(this.currentMarket);
            }
        });
    }

    updateCurrentMarket(newMarket: UserMarket) {
        this.marketDataService.updateCurrentMarketId(this.currentMarket.id).subscribe((result) => {
            if (result && this.userMarkets!=null) {
                this.currentMarket = this.userMarkets.find(x => x.id === newMarket.id);
                this.sharedService.updateMarket(this.currentMarket);
            }
        });
    }
    
}
