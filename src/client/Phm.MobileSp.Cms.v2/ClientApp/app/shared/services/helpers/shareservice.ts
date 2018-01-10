import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { UserDataService } from "../userdataservice";
import {UserMarket, User} from "../../../models/userclasses";
import {IFeedItem} from "../../../contracts/models/IFeedModel";
import { NavMenuOption } from '../../../models/navmenuclasses';
import {EntityPermissionDataService} from "../entitypermissiondataservice";
import {NavItem} from "../../../components/navigation/tabbednavmenu/tabnavmenu.component";

@Injectable()
export class ShareService {
  public currentUser: User = new User();

  constructor(public userDataService: UserDataService, public entityPermissionDataService: EntityPermissionDataService) {
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


  private mainNavUpdate = new Subject<[NavMenuOption[], string, boolean]>();
  mainNavUpdated = this.mainNavUpdate.asObservable();

  public updateMainNavMenu(navItems: NavMenuOption[], backText: string = null, overwriteBase: boolean = false) {
    this.mainNavUpdate.next([navItems, backText, overwriteBase]);
  }

  private permissionsUpdate = new Subject<boolean>();
  permissionsUpdated = this.permissionsUpdate.asObservable();

  public emitPermissionsUpdateNotification() {
    this.permissionsUpdate.next(true);
  }
}
