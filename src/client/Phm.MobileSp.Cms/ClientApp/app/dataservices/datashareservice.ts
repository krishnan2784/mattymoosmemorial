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

    private marketIdUpdate = new Subject<UserMarket>();
    marketUpdated = this.marketIdUpdate.asObservable();

    public updateMarketId(market: UserMarket) {
        this.currentMarket = market;
        this.marketIdUpdate.next(market);
    }
}