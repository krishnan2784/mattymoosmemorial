import { Component, Input } from '@angular/core';
import { ShareService } from "../../services/helpers/shareservice";
import { FeedTypeEnum, FeedCategoryEnum } from "../../enums";

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
    constructor(public displayText: string, public link: string, public colourClass: string = 'grey') {    }
}

export class DefaultTabNavs {
    public static feedIndexTabs: NavItem[] = [
        new NavItem('All', '/feed'),
        new NavItem('Announcement', '/feed/' + FeedCategoryEnum.Announcement),
        new NavItem('Article', '/feed/' + FeedCategoryEnum.Article),
        new NavItem('Campaign', '/feed/' + FeedCategoryEnum.Campaign),
        new NavItem('Learning', '/feed/' + FeedCategoryEnum.Learning),
        new NavItem('News', '/feed/' + FeedCategoryEnum.News)];
    public static reportsTabs: NavItem[] = [
            new NavItem('Quiz Reports', '/reports'),
            new NavItem('Survey Reports', '/reports/' + FeedTypeEnum.Survey),
            new NavItem('Observation Reports', '/reports/' + FeedTypeEnum.Observation),
            new NavItem('Leaderboards', '/reports/leaderboard', 'teal')];
}