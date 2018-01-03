import { Component, Input } from '@angular/core';import {ShareService} from "../../../shared/services/helpers/shareservice";import {FeedCategoryEnum, FeedTypeEnum } from "../../../../enums";
@Component({
    selector: 'tab-nav-menu',
    template: require('./tabnavmenu.component.html'),
    styles: [require('./tabnavmenu.component.css')]
})
export class TabNavMenuComponent {    
    navItems: NavItem[];

    constructor(public shareService: ShareService) {
        this.shareService.navTabsUpdated.subscribe((tabs) => {
            this.navItems = tabs;
        });
    }
}

export class NavItem {
    constructor(public displayText: string, public link: string, public colourClass: string = 'mobileSpPurple') {    }
}

export class DefaultTabNavs {
    public static feedIndexTabs: NavItem[] = [
        new NavItem('All', '/feed', 'all'),
        new NavItem('Announcement', '/feed/' + FeedCategoryEnum.Announcement),
        new NavItem('Article', '/feed/' + FeedCategoryEnum.Article),
        new NavItem('Campaign', '/feed/' + FeedCategoryEnum.Campaign),
        new NavItem('Learning', '/feed/' + FeedCategoryEnum.Learning),
        new NavItem('News', '/feed/' + FeedCategoryEnum.News)];
    public static reportsTabs: NavItem[] = [
        new NavItem('Quiz Reports', '/reports', 'lightPurple'),
        new NavItem('Survey Reports', '/reports/' + FeedTypeEnum.Survey, 'orange'),
            new NavItem('Observation Reports', '/reports/' + FeedTypeEnum.Observation, 'funk'),
            new NavItem('Leaderboard Reports', '/reports/leaderboard', 'teal')];
}
