"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeedTypeEnum;
(function (FeedTypeEnum) {
    FeedTypeEnum[FeedTypeEnum["Text"] = 0] = "Text";
    FeedTypeEnum[FeedTypeEnum["Video"] = 1] = "Video";
    FeedTypeEnum[FeedTypeEnum["Image"] = 2] = "Image";
    FeedTypeEnum[FeedTypeEnum["Quiz"] = 3] = "Quiz";
    FeedTypeEnum[FeedTypeEnum["Survey"] = 4] = "Survey";
    FeedTypeEnum[FeedTypeEnum["VideoLink"] = 5] = "VideoLink";
    FeedTypeEnum[FeedTypeEnum["ImageLink"] = 6] = "ImageLink";
    FeedTypeEnum[FeedTypeEnum["PdfLink"] = 7] = "PdfLink";
    FeedTypeEnum[FeedTypeEnum["Observation"] = 8] = "Observation";
})(FeedTypeEnum = exports.FeedTypeEnum || (exports.FeedTypeEnum = {}));
var FeedCategoryEnum;
(function (FeedCategoryEnum) {
    FeedCategoryEnum[FeedCategoryEnum["Learning"] = 0] = "Learning";
    FeedCategoryEnum[FeedCategoryEnum["News"] = 1] = "News";
    FeedCategoryEnum[FeedCategoryEnum["General"] = 2] = "General";
    FeedCategoryEnum[FeedCategoryEnum["Campaign"] = 3] = "Campaign";
    FeedCategoryEnum[FeedCategoryEnum["Announcement"] = 4] = "Announcement";
    FeedCategoryEnum[FeedCategoryEnum["Article"] = 5] = "Article";
})(FeedCategoryEnum = exports.FeedCategoryEnum || (exports.FeedCategoryEnum = {}));
var MediaTypes;
(function (MediaTypes) {
    MediaTypes[MediaTypes["Text"] = 0] = "Text";
    MediaTypes[MediaTypes["Font"] = 1] = "Font";
    MediaTypes[MediaTypes["Image"] = 2] = "Image";
    MediaTypes[MediaTypes["Video"] = 3] = "Video";
    MediaTypes[MediaTypes["Icon"] = 4] = "Icon";
})(MediaTypes = exports.MediaTypes || (exports.MediaTypes = {}));
var QuizQuestionTypeEnum;
(function (QuizQuestionTypeEnum) {
    QuizQuestionTypeEnum[QuizQuestionTypeEnum["Single"] = 0] = "Single";
    QuizQuestionTypeEnum[QuizQuestionTypeEnum["Multiple"] = 1] = "Multiple";
})(QuizQuestionTypeEnum = exports.QuizQuestionTypeEnum || (exports.QuizQuestionTypeEnum = {}));
var SurveyQuestionTypeEnum;
(function (SurveyQuestionTypeEnum) {
    SurveyQuestionTypeEnum[SurveyQuestionTypeEnum["Single"] = 0] = "Single";
    SurveyQuestionTypeEnum[SurveyQuestionTypeEnum["Multiple"] = 1] = "Multiple";
})(SurveyQuestionTypeEnum = exports.SurveyQuestionTypeEnum || (exports.SurveyQuestionTypeEnum = {}));
var AppTypeEnum;
(function (AppTypeEnum) {
    AppTypeEnum[AppTypeEnum["FISA"] = 0] = "FISA";
    AppTypeEnum[AppTypeEnum["CCESG"] = 1] = "CCESG";
    AppTypeEnum[AppTypeEnum["MLearning"] = 2] = "MLearning";
})(AppTypeEnum = exports.AppTypeEnum || (exports.AppTypeEnum = {}));
//# sourceMappingURL=enums.js.map