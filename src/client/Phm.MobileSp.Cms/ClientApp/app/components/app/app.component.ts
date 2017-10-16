import { Component } from '@angular/core';
import { FeedDataService } from "../../services/feeddataservice";
import { MarketDataService } from "../../services/marketdataservice";
import { ShareService } from "../../services/helpers/shareservice";
import { UserDataService } from "../../services/userdataservice";
import Mediaservice = require("../../services/mediaservice");
import MediaDataService = Mediaservice.MediaDataService;
import {BrandingService} from "../../services/brandingservice";

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')],
    providers: [FeedDataService, MarketDataService, ShareService, UserDataService, MediaDataService, BrandingService]
})
export class AppComponent {
    public pageTitle: string;
    public marketDropdownIsVisible: boolean;
	public backButtonText: string;
	public appTheme: string = '';

    constructor(private sharedService: ShareService) {

		sharedService.appThemeUpdated.subscribe((appTheme) => {
			this.setAppTheme(appTheme);
		});

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

    setPageTitle(value) {
        this.pageTitle = value;
    }

    setBackText(value) {
        this.backButtonText = value;
    }

	setMarketDropdownVisibility(value) {
		this.marketDropdownIsVisible = value;
	}

	setAppTheme(value) {
		this.appTheme = value;
		console.log(value, this.appTheme);
	}

    goBack() {
        this.sharedService.goBackEvent.emit();
    }
}
