"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavMenuOption = (function () {
    function NavMenuOption(title, routerLink, options) {
        if (options === void 0) { options = {}; }
        this.title = title;
        this.routerLink = routerLink;
        this.onClick = null;
        this.activeLink = false;
        this.onClick = options['onClick'];
        this.onClickParams = options['onClickParams'];
        this.activeLink = options['activeLink'];
        this.routerLinkActiveOptions = options['routerLinkActiveOptions'] || { exact: false };
    }
    return NavMenuOption;
}());
exports.NavMenuOption = NavMenuOption;
//# sourceMappingURL=navmenuclasses.js.map