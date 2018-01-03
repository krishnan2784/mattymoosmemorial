import { Component, OnDestroy } from '@angular/core';
import {ShareService} from "../shared/services/helpers/shareservice";
import {NavItem} from "../components/container/tabbednavmenu/tabnavmenu.component";

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

    public updatePageTitle(pageTitle: string = '') {
        this.sharedService.updatePageTitle(pageTitle);
    }

    public updateMarketDropdownVisibility(displayMarketDropdown: boolean) {
        this.sharedService.updateMarketDropdownVisibility(displayMarketDropdown);
        this.sharedService.updateMarketDropdownEnabledState(displayMarketDropdown);
    }

    public updateBackText(backText: string = '') {
        this.sharedService.updateBackButton(backText);
        if (backText !== '') {
            this.sharedService.goBackEvent.subscribe(() => {
                this.goBack();
            });
        }
    }

    public updateTabNavItems(tabNavItems: NavItem[] =[]) {
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
