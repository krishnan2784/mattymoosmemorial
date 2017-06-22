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
var FeedCategoryEnum = Enums.FeedCategoryEnum;
var FeedTypeEnum = Enums.FeedTypeEnum;
var Quizclasses = require("./quizclasses");
var Surveyclasses = require("./surveyclasses");
var Baseclasses = require("./baseclasses");
var Date1 = require("../classes/helpers/date");
var DateEx = Date1.DateEx;
var BaseFeed = (function (_super) {
    __extends(BaseFeed, _super);
    function BaseFeed(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.title = options['title'] || '';
        _this.shortDescription = options['shortDescription'] || '';
        _this.feedCategory = options['feedCategory'];
        _this.points = options['points'] || 0;
        _this.mainIcon = options['mediaInfo'];
        _this.marketId = options['marketId'];
        _this.allowFavourite = options['allowFavourite'] || true;
        _this.corporateApp = options['corporateApp'];
        _this.legalInformation = options['legalInformation'];
        _this.makeTitleWidgetLink = options['makeTitleWidgetLink'];
        _this.permissions = options['permissions'];
        _this.readingTime = options['readingTime'] || 0;
        _this.startDate = options['startDate'];
        _this.endDate = options['endDate'];
        _this.publishedLiveAt = options['publishedLiveAt'];
        _this.formatFeedItemDates();
        return _this;
    }
    BaseFeed.prototype.formatFeedItemDates = function (feedItem) {
        if (feedItem === void 0) { feedItem = this; }
        var d = new Date();
        if (feedItem.startDate) {
            d = new Date(feedItem.startDate);
        }
        feedItem.startDate = DateEx.formatDate(d);
        var d2 = new Date();
        ;
        if (feedItem.endDate) {
            d2 = new Date(feedItem.endDate);
        }
        else {
            d2.setDate(d.getDate() + 14);
        }
        feedItem.endDate = DateEx.formatDate(d2);
    };
    return BaseFeed;
}(Baseclasses.BaseModel));
exports.BaseFeed = BaseFeed;
var CampaignFeed = (function (_super) {
    __extends(CampaignFeed, _super);
    function CampaignFeed(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.feedCategory = FeedCategoryEnum.Campaign;
        _this.feedType = options['feedType'];
        _this.campaignDescription = options['campaignDescription'] || '';
        _this.feeds = options['feeds'];
        return _this;
    }
    return CampaignFeed;
}(BaseFeed));
exports.CampaignFeed = CampaignFeed;
var ImageFeed = (function (_super) {
    __extends(ImageFeed, _super);
    function ImageFeed(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.feedType = FeedTypeEnum.Image;
        _this.imageDescription = options['imageDescription'] || '';
        _this.mainImage = options['mainImage'];
        return _this;
    }
    return ImageFeed;
}(BaseFeed));
exports.ImageFeed = ImageFeed;
var QuizFeed = (function (_super) {
    __extends(QuizFeed, _super);
    function QuizFeed(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.feedType = FeedTypeEnum.Quiz;
        _this.questions = options['questions'];
        _this.quizDescription = options['quizDescription'] || '';
        _this.onBoardingMessage = options['onBoardingMessage'] || '';
        _this.successMessage = options['successMessage'] || '';
        _this.failMessage = options['failMessage'] || '';
        if (!_this.questions) {
            _this.questions = [];
            _this.questions.push(new Quizclasses.QuizQuestion());
        }
        return _this;
    }
    return QuizFeed;
}(BaseFeed));
exports.QuizFeed = QuizFeed;
var SurveyFeed = (function (_super) {
    __extends(SurveyFeed, _super);
    function SurveyFeed(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.feedType = FeedTypeEnum.Survey;
        _this.questions = options['questions'];
        _this.surveyDescription = options['surveyDescription'] || '';
        _this.completionMessage = options['completionMessage'] || '';
        if (!_this.questions) {
            _this.questions = [];
            _this.questions.push(new Surveyclasses.SurveyQuestion());
        }
        return _this;
    }
    return SurveyFeed;
}(BaseFeed));
exports.SurveyFeed = SurveyFeed;
var ObservationFeed = (function (_super) {
    __extends(ObservationFeed, _super);
    function ObservationFeed(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.feedType = FeedTypeEnum.Observation;
        _this.userObservations = options['userObservation'] || [];
        return _this;
    }
    return ObservationFeed;
}(SurveyFeed));
exports.ObservationFeed = ObservationFeed;
var TextFeed = (function (_super) {
    __extends(TextFeed, _super);
    function TextFeed(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.feedType = FeedTypeEnum.Text;
        _this.bodyText = options['bodyText'] || '';
        return _this;
    }
    return TextFeed;
}(BaseFeed));
exports.TextFeed = TextFeed;
var VideoFeed = (function (_super) {
    __extends(VideoFeed, _super);
    function VideoFeed(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.feedType = FeedTypeEnum.Video;
        _this.videoDescription = options['videoDescription'] || '';
        _this.mainVideo = options['mainVideo'];
        return _this;
    }
    return VideoFeed;
}(BaseFeed));
exports.VideoFeed = VideoFeed;
//# sourceMappingURL=feedclasses.js.map