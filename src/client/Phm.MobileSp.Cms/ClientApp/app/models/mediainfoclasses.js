"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Baseclasses = require("./baseclasses");
var MediaInfo = (function (_super) {
    __extends(MediaInfo, _super);
    function MediaInfo(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.extension = options['Extension'] || '';
        _this.marketId = options['MarketId'];
        _this.mediaId = options['MediaId'];
        _this.mediaType = options['MediaType'];
        _this.mediaVersion = options['MediaVersion'];
        _this.name = options['Name'];
        _this.path = options['Path'];
        _this.preview1Path = options['Preview1Path'];
        _this.size = options['Size'];
        return _this;
    }
    return MediaInfo;
}(Baseclasses.BaseModel));
exports.MediaInfo = MediaInfo;
//# sourceMappingURL=mediainfoclasses.js.map