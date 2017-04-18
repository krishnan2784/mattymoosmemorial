import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShareService} from "../dataservices/datashareservice";

@Component({
    template: '',
    providers: [ShareService]
})
export class BaseComponent implements  OnDestroy {
    constructor(public sharedService: ShareService, pageTitle: string, marketDropdownVisiblity: boolean) {
        this.updatePageTitle(pageTitle);
        this.updateMarketDropdownVisibility(marketDropdownVisiblity);
    }

    public updatePageTitle(pageTitle: string) {
        this.sharedService.updatePageTitle(pageTitle);
    }

    public updateMarketDropdownVisibility(displayMarketDropdown: boolean) {
        this.sharedService.updateMarketDropdownVisibility(displayMarketDropdown);
    }

    ngOnDestroy() {
        this.updatePageTitle('');
        this.updateMarketDropdownVisibility(false);
    }

}
