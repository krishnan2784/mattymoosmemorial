import { Component, OnInit, OnDestroy, Inject, ViewEncapsulation, RendererFactory2, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, PRIMARY_OUTLET } from '@angular/router';
import { Meta, Title, DOCUMENT, MetaDefinition } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { isPlatformServer } from '@angular/common';

// i18n support
//import { TranslateService } from '@ngx-translate/core';
import { REQUEST } from './shared/constants/request';
import { LinkService } from "./shared/services/link.service";
import {FeedDataService} from "./shared/services/feeddataservice";
import {MarketDataService} from "./shared/services/marketdataservice";
import {ShareService} from "./shared/services/helpers/shareservice";
import {UserDataService} from "./shared/services/userdataservice";
import {MediaDataService} from "./shared/services/mediaservice";

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [FeedDataService, MarketDataService, ShareService, UserDataService, MediaDataService]
})
export class AppComponent implements OnInit, OnDestroy {

    // This will go at the END of your title for example "Home - Angular Universal..." <-- after the dash (-)
    private endPageTitle: string = 'MobileSP CMS';
    // If no Title is provided, we'll use a default one before the dash(-)
    private defaultPageTitle: string = 'mLearning';

    private routerSub$: Subscription;

    public pageTitle: string;
    public marketDropdownIsVisible: boolean;
    public backButtonText: string;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private title: Title,
        private meta: Meta,
        private linkService: LinkService,
       // public translate: TranslateService,
        private sharedService: ShareService,
        @Inject(REQUEST) private request
    ) {
        // this language will be used as a fallback when a translation isn't found in the current language
       // translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
       // translate.use('en');

        //console.log(`What's our REQUEST Object look like?`);
        //console.log(`The Request object only really exists on the Server, but on the Browser we can at least see Cookies`);
        //console.log(this.request);

        sharedService.pageTitleUpdated.subscribe((pageTitle) => {
          this.setPageTitle(pageTitle);
        });

        sharedService.backButtonUpdated.subscribe((backText) => {
          this.setBackText(backText);
        });

        sharedService.marketDropdownVisibilitypeUpdated.subscribe((isVisible) => {
          this.setMarketDropdownVisibility(isVisible);
        });
    }

    ngOnInit() {
        // Change "Title" on every navigationEnd event
        // Titles come from the data.title property on all Routes (see app.routes.ts)
        this._changeTitleOnNavigation();
    }

    ngOnDestroy() {
        // Subscription clean-up
        this.routerSub$.unsubscribe();
    }

    private _changeTitleOnNavigation() {

        this.routerSub$ = this.router.events
            .filter(event => event instanceof NavigationEnd)
            .map(() => this.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .mergeMap(route => route.data)
            .subscribe((event) => {
                this._setMetaAndLinks(event);
            });
    }

    private _setMetaAndLinks(event) {

        // Set Title if available, otherwise leave the default Title
        const title = event['title']
            ? `${event['title']} - ${this.endPageTitle}`
            : `${this.defaultPageTitle} - ${this.endPageTitle}`;

        this.title.setTitle(title);

        const metaData = event['meta'] || [];
        const linksData = event['links'] || [];

        for (let i = 0; i < metaData.length; i++) {
            this.meta.updateTag(metaData[i]);
        }

        for (let i = 0; i < linksData.length; i++) {
            this.linkService.addTag(linksData[i]);
        }
    }

    setPageTitle(value) {
      this.pageTitle = value;
    }

    setBackText(value) {
      this.backButtonText = value;
    }

    setMarketDropdownVisibility(value) {
      this.marketDropdownIsVisible = value;
    }

    goBack() {
      this.sharedService.goBackEvent.emit();
    }
}

