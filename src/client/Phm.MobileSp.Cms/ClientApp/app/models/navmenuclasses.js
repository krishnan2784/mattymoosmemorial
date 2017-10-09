"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NavMenuOption = (function () {
    function NavMenuOption(title, routerLink, options) {
        if (options === void 0) { options = {}; }
        this.title = title;
        this.routerLink = routerLink;
        this.onClick = null;
        this.onClick = options['onClick'];
        this.routerLinkActiveOptions = options['routerLinkActiveOptions'] || { exact: true };
    }
    return NavMenuOption;
}());
exports.NavMenuOption = NavMenuOption;
//# sourceMappingURL=navmenuclasses.js.map