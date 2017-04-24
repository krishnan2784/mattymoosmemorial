"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Enums = require("../../../enums");
var FeedTypeEnum = Enums.FeedTypeEnum;
var Feedclasses = require("../../../models/feedclasses");
var SurveyFeedItemFormComponent = (function () {
    function SurveyFeedItemFormComponent(injector) {
        this.injector = injector;
        this.updateUrl = '/api/Feed/UpdateSurveyFeedItem';
        this.feedType = FeedTypeEnum.Survey;
        if (injector) {
            this.form = injector.get('form');
            this.feedFormSteps = injector.get('feedFormSteps');
        }
        this.feedModelType = Feedclasses.SurveyFeed;
    }
    SurveyFeedItemFormComponent.prototype.addFormControls = function (form) {
        return form;
    };
    ;
    SurveyFeedItemFormComponent.prototype.removeFormControls = function (form) {
        return form;
    };
    ;
    return SurveyFeedItemFormComponent;
}());
SurveyFeedItemFormComponent = __decorate([
    core_1.Component({
        selector: 'surveyfeeditem',
        template: require('./surveyfeeditem.component.html')
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], SurveyFeedItemFormComponent);
exports.SurveyFeedItemFormComponent = SurveyFeedItemFormComponent;
//# sourceMappingURL=surveyfeeditem.component.js.map