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
var baseclasses_1 = require("./baseclasses");
var mediainfoclasses_1 = require("./mediainfoclasses");
var BrandingElement = (function (_super) {
    __extends(BrandingElement, _super);
    function BrandingElement(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.order = options['order'] || 0;
        _this.groupDescription = options['groupDescription'] || '';
        _this.key = options['key'] || '';
        _this.description = options['description'] || '';
        _this.elementType = options['elementType'];
        _this.value = options['value'] || '';
        _this.primaryImage = options['primaryImage'] || new mediainfoclasses_1.MediaInfo();
        _this.primaryImageId = options['primaryImageId'] || 0;
        _this.secondaryImage = options['secondaryImage'] || new mediainfoclasses_1.MediaInfo();
        _this.secondaryImageId = options['secondaryImageId'] || 0;
        return _this;
    }
    return BrandingElement;
}(baseclasses_1.BaseModel));
exports.BrandingElement = BrandingElement;
//# sourceMappingURL=brandingclasses.js.map