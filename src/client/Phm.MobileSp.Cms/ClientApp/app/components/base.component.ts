import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ShareService } from "../services/helpers/shareservice";
import { NavItem } from "./navmenu/tabnavmenu.component";

@Component({
    template: '',
    providers: [ShareService]
})
export class BaseComponent implements  OnDestroy {
    constructor(public sharedService: ShareService, pageTitle: string,
        marketDropdownVisiblity: boolean, goBackText: string = '', tabNavItems: NavItem[]=[]) {
        this.updatePageTitle(pageTitle);
        this.updateMarketDropdownVisibility(marketDropdownVisiblity);
        this.updateBackText(goBackText);
        this.updateTabNavItems(tabNavItems);
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

    public updateTabNavItems(tabNavItems: NavItem[]) {
        console.log('1:' + tabNavItems);
        this.sharedService.updateNavTabs(tabNavItems);
    }

    public goBack() {
        
    }

    ngOnDestroy() {
        this.updatePageTitle('');
        this.updateMarketDropdownVisibility(false);
        this.updateBackText('');
    }

}
