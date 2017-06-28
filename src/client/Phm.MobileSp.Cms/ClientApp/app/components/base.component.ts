import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShareService} from "../services/helpers/shareservice";

@Component({
    template: '',
    providers: [ShareService]
})
export class BaseComponent implements  OnDestroy {
    constructor(public sharedService: ShareService, pageTitle: string, marketDropdownVisiblity: boolean, goBackText: string = '') {
        this.updatePageTitle(pageTitle);
        this.updateMarketDropdownVisibility(marketDropdownVisiblity);
        this.updateBackText(goBackText);
    }

    public updatePageTitle(pageTitle: string) {
        this.sharedService.updatePageTitle(pageTitle);
    }

    public updateMarketDropdownVisibility(displayMarketDropdown: boolean) {
        this.sharedService.updateMarketDropdownVisibility(displayMarketDropdown);
    }

    public updateBackText(backText: string) {
        this.sharedService.updateBackButton(backText);
        if (backText !== '') {
            this.sharedService.goBackEvent.subscribe(() => {
                this.goBack();
            });
        }
    }

    public goBack() {
        
    }

    ngOnDestroy() {
        this.updatePageTitle('');
        this.updateMarketDropdownVisibility(false);
        this.updateBackText('');
    }

}
