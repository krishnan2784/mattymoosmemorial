import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import Userclasses = require("../models/userclasses");
import UserMarket = Userclasses.UserMarket;

@Injectable()
export class ShareService {
    public currentMarket: UserMarket = new UserMarket;
    public currentMarketId: number = this.currentMarket.id;

    private pageTitleUpdate = new Subject<string>();
    pageTitleUpdated = this.pageTitleUpdate.asObservable();

    public updatePageTitle(pageTitle: string) {
        this.pageTitleUpdate.next(pageTitle);
    }

    private marketDropdownVisibilitypeUpdate = new Subject<boolean>();
    marketDropdownVisibilitypeUpdated = this.marketDropdownVisibilitypeUpdate.asObservable();

    public updateMarketDropdownVisibility(isMarketDropdownVisible: boolean) {
        this.marketDropdownVisibilitypeUpdate.next(isMarketDropdownVisible);
    }

    private marketUpdate = new Subject<UserMarket>();
    marketUpdated = this.marketUpdate.asObservable();

    public updateMarket(market: UserMarket) {
        if (this.currentMarket && this.currentMarket.id === market.id)
            return;
        this.currentMarket = market;
        this.marketUpdate.next(market);
    }
}