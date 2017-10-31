import { Observable } from 'rxjs/Observable';
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import Userclasses = require("../../models/userclasses");
import UserMarket = Userclasses.UserMarket;
import FeedModel = require("../../interfaces/models/IFeedModel");
import { NavItem } from "../../components/navmenu/tabnavmenu.component";
import { UserDataService } from "../userdataservice";
import { User } from "../../models/userclasses";
import IFeedItem = FeedModel.IFeedItem;
import {NavMenuOption} from "../../models/navmenuclasses";

@Injectable()
export class ShareService {
    public currentUser: User = new User();

    constructor(public userDataService: UserDataService) {
        userDataService.getCurrentUser().subscribe(response => {
            this.currentUser = response;
        });
    }

    public currentMarket: UserMarket = new UserMarket;
    public currentMarketId: number = this.currentMarket.id;

	private pageTitleUpdate = new Subject<string>();
	pageTitleUpdated = this.pageTitleUpdate.asObservable();

	public updatePageTitle(pageTitle: string) {
		this.pageTitleUpdate.next(pageTitle);
	}

	private appThemeUpdate = new Subject<string>();
	appThemeUpdated = this.appThemeUpdate.asObservable();

	public updateAppTheme(appTheme: string) {
		this.appThemeUpdate.next(appTheme);
	}

    private backButtonUpdate = new Subject<string>();
    backButtonUpdated = this.backButtonUpdate.asObservable();

    public updateBackButton(backText: string) {
        this.backButtonUpdate.next(backText);
    }

    private marketDropdownVisibilitypeUpdate = new Subject<boolean>();
    marketDropdownVisibilitypeUpdated = this.marketDropdownVisibilitypeUpdate.asObservable();

    public updateMarketDropdownVisibility(isMarketDropdownVisible: boolean) {
        this.marketDropdownVisibilitypeUpdate.next(isMarketDropdownVisible);
    }

    private marketDropdownEnabledUpdate = new Subject<boolean>();
    marketDropdownEnabledUpdated = this.marketDropdownEnabledUpdate.asObservable();

    public updateMarketDropdownEnabledState(isMarketDropdownEnabled: boolean) {
        this.marketDropdownEnabledUpdate.next(isMarketDropdownEnabled);
    }

    private marketUpdate = new Subject<UserMarket>();
    marketUpdated = this.marketUpdate.asObservable();

    public updateMarket(market: UserMarket) {
        if (this.currentMarket && this.currentMarket.id === market.id)
            return;
        this.currentMarket = market;
        this.marketUpdate.next(market);
    }

    private feedItemUpdate = new Subject<IFeedItem>();
    feedItemUpdated = this.feedItemUpdate.asObservable();

    public updateFeedItem(feedItem: IFeedItem) {
        this.feedItemUpdate.next(feedItem);
    }

    public goBackEvent: EventEmitter<any> = new EventEmitter<any>();

    public goBack() {
        this.goBackEvent.emit();
    }

    private tabNavUpdate = new Subject<NavItem[]>();
    navTabsUpdated = this.tabNavUpdate.asObservable();

    public updateNavTabs(navItems: NavItem[]) {
      this.tabNavUpdate.next(navItems);
    }    


    private mainNavUpdate = new Subject<[NavMenuOption[],string]>();
    mainNavUpdated = this.mainNavUpdate.asObservable();

    public updateMainNavMenu(navItems: NavMenuOption[], backText: string = null) {
      this.mainNavUpdate.next([navItems, backText]);
  }    
}