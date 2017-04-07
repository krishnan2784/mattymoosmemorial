import { Component } from '@angular/core';
import { FeedDataService } from "../../dataservices/feeddataservice";
import { MarketDataService } from "../../dataservices/marketdataservice";
import { ShareService } from "../../dataservices/datashareservice";
import { UserDataService } from "../../dataservices/userdataservice";

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')],
    providers: [FeedDataService, MarketDataService, ShareService, UserDataService]
})
export class AppComponent {
    public pageTitle: string;
    public marketDropdownIsVisible: boolean;

    constructor(private sharedService: ShareService) {

        sharedService.pageTitleUpdated.subscribe((pageTitle) => {
            this.setPageTitle(pageTitle);
        });

        sharedService.marketDropdownVisibilitypeUpdated.subscribe((isVisible) => {
            this.setMarketDropdownVisibility(isVisible);
        });
    }

    setPageTitle(value) {
        this.pageTitle = value;
    }

    setMarketDropdownVisibility(value) {
        this.marketDropdownIsVisible = value;
    }
}
