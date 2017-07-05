import { Component, Input } from '@angular/core';
import { ShareService } from "../../services/helpers/shareservice";
import { FeedTypeEnum } from "../../enums";

@Component({
    selector: 'tab-nav-menu',
    template: require('./tabnavmenu.component.html'),
    styles: [require('./tabnavmenu.component.css')]
})
export class TabNavMenuComponent {    
    navItems: NavItem[];

    constructor(public shareService: ShareService) {
        this.shareService.navTabsUpdated.subscribe((tabs) => {
            console.log(tabs);
            this.navItems = tabs;
        });
    }
}

export class NavItem {
    constructor(public displayText: string, public link: string, public colour: string = 'DFE1E0') {    }
}

export class DefaultTabNavs {
    public static reportsTabs: NavItem[] = [
        new NavItem('Quiz Reports', '/reports/' + FeedTypeEnum.Quiz),
        new NavItem('Survey Reports', '/reports/' + FeedTypeEnum.Survey),
        new NavItem('Observation Reports', '/reports/' + FeedTypeEnum.Observation),
        new NavItem('Leaderboards', '/leaderboard', '27B295')];


}