"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Baseclasses = require("./baseclasses");
var CorporateApp = (function (_super) {
    __extends(CorporateApp, _super);
    function CorporateApp(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.appType = options['appType'];
        _this.linkUrl = options['linkUrl'] || '';
        return _this;
    }
    return CorporateApp;
}(Baseclasses.BaseModel));
exports.CorporateApp = CorporateApp;
//# sourceMappingURL=corporateappclasses.js.map