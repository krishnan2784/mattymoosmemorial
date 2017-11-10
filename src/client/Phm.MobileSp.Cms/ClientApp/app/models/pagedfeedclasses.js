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
var date_1 = require("../classes/helpers/date");
var BaseFeedPage = (function () {
    function BaseFeedPage(options) {
        if (options === void 0) { options = {}; }
        this.id = options['id'] || 0;
        this.createdAt = options['createdAt'];
        this.updatedAt = options['updatedAt'];
        this.pagedFeedId = options['pagedFeedId'] || 0;
        this.basePageFeedType = options['basePageFeedType'] || Enums.BasePageFeedTypeEnum.Text;
        this.pageNumber = options['pageNumber'] || 0;
        this.title = options['title'] || '';
        var d = date_1.DateEx.formatDate(new Date());
        if (!this.createdAt) {
            this.createdAt = d;
        }
        if (!this.updatedAt) {
            this.updatedAt = d;
        }
    }
    return BaseFeedPage;
}());
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
        _this.mediaInfoId = options['mediaInfoId'];
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
        _this.mediaInfoId = options['mediaInfoId'];
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
var MediaFeedPage = (function (_super) {
    __extends(MediaFeedPage, _super);
    function MediaFeedPage(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.basePageFeedType = Enums.BasePageFeedTypeEnum.Media;
        _this.mediaInfo = options['mediaInfo'];
        _this.mediaInfoId = options['mediaInfoId'];
        return _this;
    }
    return MediaFeedPage;
}(BaseFeedPage));
exports.MediaFeedPage = MediaFeedPage;
var TabbedTextFeedPage = (function (_super) {
    __extends(TabbedTextFeedPage, _super);
    function TabbedTextFeedPage(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.basePageFeedType = Enums.BasePageFeedTypeEnum.TabbedText;
        _this.tabs = options['tabs'];
        if (!_this.tabs) {
            _this.tabs = [];
            _this.tabs.push(new TabText());
        }
        return _this;
    }
    return TabbedTextFeedPage;
}(BaseFeedPage));
exports.TabbedTextFeedPage = TabbedTextFeedPage;
var TabText = (function () {
    function TabText(options) {
        if (options === void 0) { options = {}; }
        this.id = options['id'] || 0;
        this.createdAt = options['createdAt'];
        this.updatedAt = options['updatedAt'];
        this.mediaTabbedTextFeedPageId = options['mediaTabbedTextFeedPageId'] || 0;
        this.title = options['title'] || '';
        this.bodyText = options['bodyText'] || '';
        this.order = options['order'] || 0;
        var d = date_1.DateEx.formatDate(new Date());
        if (!this.createdAt) {
            this.createdAt = d;
        }
        if (!this.updatedAt) {
            this.updatedAt = d;
        }
    }
    return TabText;
}());
exports.TabText = TabText;
//# sourceMappingURL=pagedfeedclasses.js.map