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
var MediaInfo = (function (_super) {
    __extends(MediaInfo, _super);
    function MediaInfo(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.extension = options['extension'] || '';
        _this.marketId = options['marketId'];
        _this.mediaId = options['mediaId'];
        _this.mediaType = options['mediaType'];
        _this.mediaVersion = options['mediaVersion'];
        _this.name = options['name'];
        _this.path = options['path'];
        _this.preview1Path = options['preview1Path'];
        _this.size = options['size'];
        return _this;
    }
    return MediaInfo;
}(Baseclasses.BaseModel));
exports.MediaInfo = MediaInfo;
//# sourceMappingURL=mediainfoclasses.js.map