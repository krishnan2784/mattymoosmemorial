"use strict";
/*
 * THIS IS TEMPORARY TO PATCH 2.1.1+ Core bugs
 */
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var __compiler__ = require('@angular/compiler');
var core_1 = require("@angular/core");
var core = require('@angular/core');
if (!core_1.__core_private__['ViewUtils']) {
    core_1.__core_private__['ViewUtils'] = core_1.__core_private__['view_utils'];
}
if (!core.Version) {
    core.Version = function (version) {
        return core;
    };
}
if (__compiler__ && __compiler__.SelectorMatcher && __compiler__.CssSelector) {
    (__compiler__).__compiler_private__ = {
        SelectorMatcher: __compiler__.SelectorMatcher,
        CssSelector: __compiler__.CssSelector
    };
}
//# sourceMappingURL=__workaround.browser.js.map