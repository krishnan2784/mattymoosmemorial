"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var shareservice_1 = require("../../services/helpers/shareservice");
var enums_1 = require("../../enums");
var TabNavMenuComponent = (function () {
    function TabNavMenuComponent(shareService) {
        var _this = this;
        this.shareService = shareService;
        this.shareService.navTabsUpdated.subscribe(function (tabs) {
            _this.navItems = tabs;
        });
    }
    return TabNavMenuComponent;
}());
TabNavMenuComponent = __decorate([
    core_1.Component({
        selector: 'tab-nav-menu',
        template: require('./tabnavmenu.component.html'),
        styles: [require('./tabnavmenu.component.css')]
    }),
    __metadata("design:paramtypes", [shareservice_1.ShareService])
], TabNavMenuComponent);
exports.TabNavMenuComponent = TabNavMenuComponent;
var NavItem = (function () {
    function NavItem(displayText, link, colourClass) {
        if (colourClass === void 0) { colourClass = 'mobileSpPurple'; }
        this.displayText = displayText;
        this.link = link;
        this.colourClass = colourClass;
    }
    return NavItem;
}());
exports.NavItem = NavItem;
var DefaultTabNavs = (function () {
    function DefaultTabNavs() {
    }
    return DefaultTabNavs;
}());
DefaultTabNavs.feedIndexTabs = [
    new NavItem('All', '/feed', 'all'),
    new NavItem('Announcement', '/feed/' + enums_1.FeedCategoryEnum.Announcement),
    new NavItem('Article', '/feed/' + enums_1.FeedCategoryEnum.Article),
    new NavItem('Campaign', '/feed/' + enums_1.FeedCategoryEnum.Campaign),
    new NavItem('Learning', '/feed/' + enums_1.FeedCategoryEnum.Learning),
    new NavItem('News', '/feed/' + enums_1.FeedCategoryEnum.News)
];
DefaultTabNavs.reportsTabs = [
    new NavItem('Quiz Reports', '/reports', 'lightPurple'),
    new NavItem('Survey Reports', '/reports/' + enums_1.FeedTypeEnum.Survey, 'orange'),
    new NavItem('Observation Reports', '/reports/' + enums_1.FeedTypeEnum.Observation, 'funk'),
    new NavItem('Leaderboard Reports', '/reports/leaderboard', 'teal')
];
DefaultTabNavs.competitionsTabs = [
    new NavItem('Competitions', '/competitions', 'teal'),
    new NavItem('Reward Schemes', '/competitions/rewardschemes', 'orange'),
    new NavItem('T&C', '/competitions/termsandconditions', 'funk')
];
exports.DefaultTabNavs = DefaultTabNavs;
//# sourceMappingURL=tabnavmenu.component.js.map