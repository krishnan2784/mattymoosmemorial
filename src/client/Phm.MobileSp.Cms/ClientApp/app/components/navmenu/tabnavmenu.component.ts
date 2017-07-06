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
        new NavItem('Announcement', '/' + FeedCategoryEnum.Announcement + '/feed'),
        new NavItem('Article', '/' + FeedCategoryEnum.Article + '/feed'),
        new NavItem('Campaign', '/' + FeedCategoryEnum.Campaign + '/feed'),
        new NavItem('Learning', '/' + FeedCategoryEnum.Learning + '/feed'),
        new NavItem('News', '/' + FeedCategoryEnum.News + '/feed')];
    public static reportsTabs: NavItem[] = [
            new NavItem('Quiz Reports', '/reports/' + FeedTypeEnum.Quiz),
            new NavItem('Survey Reports', '/reports/' + FeedTypeEnum.Survey),
            new NavItem('Observation Reports', '/reports/' + FeedTypeEnum.Observation),
            new NavItem('Leaderboards', '/leaderboard', 'teal')];
}