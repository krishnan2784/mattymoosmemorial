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
var Enums = require("../enums");
var Baseclasses = require("./baseclasses");
var BaseModel = Baseclasses.BaseModel;
var BaseFeedPage = (function (_super) {
    __extends(BaseFeedPage, _super);
    function BaseFeedPage(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.pagedFeedId = options['pagedFeedId'] || 0;
        _this.basePageFeedType = options['basePageFeedType'] || Enums.BasePageFeedTypeEnum.Text;
        _this.pageNumber = options['pageNumber'] || 0;
        _this.title = options['title'] || '';
        return _this;
    }
    return BaseFeedPage;
}(Baseclasses.BaseModel));
exports.BaseFeedPage = BaseFeedPage;
var TextFeedPage = (function (_super) {
    __extends(TextFeedPage, _super);
    function TextFeedPage(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.basePageFeedType = Enums.BasePageFeedTypeEnum.Text;
        _this.bodyText = options['bodyText'] || '';
        return _this;
    }
    return TextFeedPage;
}(BaseFeedPage));
exports.TextFeedPage = TextFeedPage;
var MediaTextFeedPage = (function (_super) {
    __extends(MediaTextFeedPage, _super);
    function MediaTextFeedPage(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.basePageFeedType = Enums.BasePageFeedTypeEnum.MediaText;
        _this.mediaInfo = options['mediaInfo'];
        _this.mediaInfoId = options['mediaInfoId'] || 0;
        _this.bodyText = options['bodyText'] || '';
        return _this;
    }
    return MediaTextFeedPage;
}(BaseFeedPage));
exports.MediaTextFeedPage = MediaTextFeedPage;
var MediaTabbedTextFeedPage = (function (_super) {
    __extends(MediaTabbedTextFeedPage, _super);
    function MediaTabbedTextFeedPage(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.basePageFeedType = Enums.BasePageFeedTypeEnum.MediaTabbedText;
        _this.mediaInfo = options['mediaInfo'];
        _this.mediaInfoId = options['mediaInfoId'] || 0;
        _this.tabs = options['tabs'];
        if (!_this.tabs) {
            _this.tabs = [];
            _this.tabs.push(new TabText());
        }
        return _this;
    }
    return MediaTabbedTextFeedPage;
}(BaseFeedPage));
exports.MediaTabbedTextFeedPage = MediaTabbedTextFeedPage;
var TabText = (function (_super) {
    __extends(TabText, _super);
    function TabText(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.mediaTabbedTextFeedPageId = options['mediaTabbedTextFeedPageId'] || 0;
        _this.title = options['title'] || '';
        _this.bodyText = options['bodyText'] || '';
        _this.order = options['order'] || 0;
        return _this;
    }
    return TabText;
}(BaseModel));
exports.TabText = TabText;
//# sourceMappingURL=pagedfeedclasses.js.map