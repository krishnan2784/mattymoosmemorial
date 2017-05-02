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
var forms_1 = require("@angular/forms");
var Enums = require("../../../enums");
var FeedTypeEnum = Enums.FeedTypeEnum;
var Feedclasses = require("../../../models/feedclasses");
var TextFeedItemFormComponent = (function () {
    function TextFeedItemFormComponent(injector) {
        this.injector = injector;
        this.updateUrl = '/api/Feed/UpdateTextFeedItem';
        this.feedType = FeedTypeEnum.Text;
        if (injector) {
            this.form = injector.get('form');
            this.feedFormSteps = injector.get('feedFormSteps');
        }
        this.feedModelType = Feedclasses.TextFeed;
    }
    TextFeedItemFormComponent.prototype.addFormControls = function (form) {
        form.addControl('bodyText', new forms_1.FormControl('', [forms_1.Validators.required, forms_1.Validators.minLength(5)]));
        return form;
    };
    ;
    TextFeedItemFormComponent.prototype.removeFormControls = function (form) {
        form.removeControl('bodyText');
        return form;
    };
    ;
    return TextFeedItemFormComponent;
}());
TextFeedItemFormComponent = __decorate([
    core_1.Component({
        selector: 'textfeeditem',
        template: require('./textfeeditem.component.html')
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], TextFeedItemFormComponent);
exports.TextFeedItemFormComponent = TextFeedItemFormComponent;
//# sourceMappingURL=textfeeditem.component.js.map