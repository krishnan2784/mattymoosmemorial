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
    FeedTypeEnum[FeedTypeEnum["Paged"] = 9] = "Paged";
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
    MediaTypes[MediaTypes["File"] = 5] = "File";
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
var CopiedElementTypeEnum;
(function (CopiedElementTypeEnum) {
    CopiedElementTypeEnum[CopiedElementTypeEnum["CarModel"] = 0] = "CarModel";
    CopiedElementTypeEnum[CopiedElementTypeEnum["CarSerie"] = 1] = "CarSerie";
    CopiedElementTypeEnum[CopiedElementTypeEnum["Technology"] = 2] = "Technology";
    CopiedElementTypeEnum[CopiedElementTypeEnum["Family"] = 3] = "Family";
    CopiedElementTypeEnum[CopiedElementTypeEnum["CustomerQualification"] = 4] = "CustomerQualification";
    CopiedElementTypeEnum[CopiedElementTypeEnum["BodyColourSection"] = 5] = "BodyColourSection";
    CopiedElementTypeEnum[CopiedElementTypeEnum["CarOptionSection"] = 6] = "CarOptionSection";
    CopiedElementTypeEnum[CopiedElementTypeEnum["WalkAroundSteps"] = 7] = "WalkAroundSteps";
    CopiedElementTypeEnum[CopiedElementTypeEnum["CarSerieSpec"] = 8] = "CarSerieSpec";
    CopiedElementTypeEnum[CopiedElementTypeEnum["MobileConfig"] = 9] = "MobileConfig";
    CopiedElementTypeEnum[CopiedElementTypeEnum["ProductInformation"] = 10] = "ProductInformation";
    CopiedElementTypeEnum[CopiedElementTypeEnum["LocalisationSet"] = 11] = "LocalisationSet";
    CopiedElementTypeEnum[CopiedElementTypeEnum["CompetitorsCarModel"] = 12] = "CompetitorsCarModel";
    CopiedElementTypeEnum[CopiedElementTypeEnum["CompetitorsAssign"] = 13] = "CompetitorsAssign";
    CopiedElementTypeEnum[CopiedElementTypeEnum["VEDBandGroup"] = 14] = "VEDBandGroup";
    CopiedElementTypeEnum[CopiedElementTypeEnum["Feed"] = 15] = "Feed";
})(CopiedElementTypeEnum = exports.CopiedElementTypeEnum || (exports.CopiedElementTypeEnum = {}));
var PublishToTestObjectTypeEnum;
(function (PublishToTestObjectTypeEnum) {
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["CarModel"] = 0] = "CarModel";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["CarSerie"] = 1] = "CarSerie";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["Technology"] = 2] = "Technology";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["Family"] = 3] = "Family";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["CustomerQualification"] = 4] = "CustomerQualification";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["BodyColourSection"] = 5] = "BodyColourSection";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["CarOptionSection"] = 6] = "CarOptionSection";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["WalkAroundSteps"] = 7] = "WalkAroundSteps";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["CarSerieSpec"] = 8] = "CarSerieSpec";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["MobileConfig"] = 9] = "MobileConfig";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["ProductInformation"] = 10] = "ProductInformation";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["BodyColour"] = 14] = "BodyColour";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["CarOption"] = 15] = "CarOption";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["CarSerieFeature"] = 16] = "CarSerieFeature";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["CustomerQualificationQuestion"] = 18] = "CustomerQualificationQuestion";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["CustomerQualificationAnswer"] = 19] = "CustomerQualificationAnswer";
    PublishToTestObjectTypeEnum[PublishToTestObjectTypeEnum["VEDBandGroup"] = 20] = "VEDBandGroup";
})(PublishToTestObjectTypeEnum = exports.PublishToTestObjectTypeEnum || (exports.PublishToTestObjectTypeEnum = {}));
var UploaderType;
(function (UploaderType) {
    UploaderType[UploaderType["Any"] = 0] = "Any";
    UploaderType[UploaderType["Image"] = 1] = "Image";
    UploaderType[UploaderType["Video"] = 2] = "Video";
    UploaderType[UploaderType["ImageAndVideo"] = 3] = "ImageAndVideo";
    UploaderType[UploaderType["File"] = 4] = "File";
})(UploaderType = exports.UploaderType || (exports.UploaderType = {}));
var UserPointType;
(function (UserPointType) {
    UserPointType[UserPointType["Unknown"] = 0] = "Unknown";
    UserPointType[UserPointType["QuizFeed"] = 1] = "QuizFeed";
    UserPointType[UserPointType["TextFeed"] = 2] = "TextFeed";
    UserPointType[UserPointType["VideoFeed"] = 3] = "VideoFeed";
    UserPointType[UserPointType["SurveyFeed"] = 4] = "SurveyFeed";
})(UserPointType = exports.UserPointType || (exports.UserPointType = {}));
var BasePageFeedTypeEnum;
(function (BasePageFeedTypeEnum) {
    BasePageFeedTypeEnum[BasePageFeedTypeEnum["Text"] = 0] = "Text";
    BasePageFeedTypeEnum[BasePageFeedTypeEnum["MediaText"] = 1] = "MediaText";
    BasePageFeedTypeEnum[BasePageFeedTypeEnum["MediaTabbedText"] = 2] = "MediaTabbedText";
    BasePageFeedTypeEnum[BasePageFeedTypeEnum["Media"] = 3] = "Media";
    BasePageFeedTypeEnum[BasePageFeedTypeEnum["TabbedText"] = 4] = "TabbedText";
})(BasePageFeedTypeEnum = exports.BasePageFeedTypeEnum || (exports.BasePageFeedTypeEnum = {}));
//# sourceMappingURL=enums.js.map