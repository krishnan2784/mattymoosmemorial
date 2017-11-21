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
var marketclasses_1 = require("./marketclasses");
var securityclasses_1 = require("./securityclasses");
var date_1 = require("../classes/helpers/date");
var TermsAndCondition = (function (_super) {
    __extends(TermsAndCondition, _super);
    function TermsAndCondition(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.title = options['title'] || '';
        _this.fullDescription = options['fullDescription'] || '';
        _this.marketId = options['marketId'] || 0;
        _this.market = options['market'] || new marketclasses_1.Market();
        return _this;
    }
    return TermsAndCondition;
}(baseclasses_1.BaseModel));
exports.TermsAndCondition = TermsAndCondition;
var BaseRewardScheme = (function (_super) {
    __extends(BaseRewardScheme, _super);
    function BaseRewardScheme(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.title = options['title'] || '';
        _this.about = options['about'] || '';
        _this.marketId = options['marketId'] || 0;
        _this.market = options['market'] || new marketclasses_1.Market();
        return _this;
    }
    return BaseRewardScheme;
}(baseclasses_1.BaseModel));
exports.BaseRewardScheme = BaseRewardScheme;
var PositionXBoosterItem = (function (_super) {
    __extends(PositionXBoosterItem, _super);
    function PositionXBoosterItem(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.positionXBoosterRewardScheme = options['positionXBoosterRewardScheme'];
        _this.positionXBoosterRewardSchemeId = options['positionXBoosterRewardSchemeId'] || 0;
        _this.startPosition = options['startPosition'];
        _this.endPosition = options['endPosition'];
        _this.xBooster = options['xBooster'];
        return _this;
    }
    return PositionXBoosterItem;
}(baseclasses_1.BaseModel));
exports.PositionXBoosterItem = PositionXBoosterItem;
var PositionXBoosterRewardScheme = (function (_super) {
    __extends(PositionXBoosterRewardScheme, _super);
    function PositionXBoosterRewardScheme(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.items = options['items'] || [];
        if (_this.items.length === 0)
            _this.items.push(new PositionXBoosterItem({}));
        return _this;
    }
    return PositionXBoosterRewardScheme;
}(BaseRewardScheme));
exports.PositionXBoosterRewardScheme = PositionXBoosterRewardScheme;
var Competition = (function (_super) {
    __extends(Competition, _super);
    function Competition(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.secEntityId = options['secEntityId'] || 0;
        _this.secEntity = options['secEntity'] || new securityclasses_1.SecEntity();
        _this.marketId = options['marketId'] || 0;
        _this.market = options['market'] || new marketclasses_1.Market();
        _this.baseRewardSchemeId = options['baseRewardSchemeId'];
        _this.baseRewardScheme = options['baseRewardScheme'];
        _this.termsAndConditionId = options['termsAndConditionId'];
        _this.termsAndCondition = options['termsAndCondition'];
        _this.title = options['title'] || '';
        _this.about = options['about'] || '';
        _this.startDate = options['startDate'];
        _this.endDate = options['endDate'];
        _this.mainImageId = options['mainImageId'] || 0;
        _this.mainImage = options['mainImage'] || new mediainfoclasses_1.MediaInfo();
        _this.makeImageLink = options['makeImageLink'] || false;
        _this.linkTitle = options['linkTitle'] || '';
        _this.linkUrl = options['linkUrl'] || '';
        _this.activeImage = options['activeImage'];
        _this.activeImageId = options['activeImageId'];
        _this.makeActiveImageLink = options['makeActiveImageLink'] || false;
        _this.completedImage = options['completedImage'];
        _this.completedImageId = options['completedImageId'];
        _this.makeCompletedImageLink = options['makeCompletedImageLink'] || false;
        _this.participants = options['participants'] || 0;
        _this.formatDates();
        return _this;
    }
    Competition.prototype.formatDates = function (competition) {
        if (competition === void 0) { competition = this; }
        var d = new Date();
        if (competition.startDate) {
            d = new Date(competition.startDate);
        }
        competition.startDate = date_1.DateEx.formatDate(d);
        var d2 = new Date();
        if (competition.endDate) {
            d2 = new Date(competition.endDate);
        }
        else {
            d2.setDate(d.getDate() + 14);
        }
        competition.endDate = date_1.DateEx.formatDate(d2);
    };
    return Competition;
}(baseclasses_1.BaseModel));
exports.Competition = Competition;
//# sourceMappingURL=competitionclasses.js.map