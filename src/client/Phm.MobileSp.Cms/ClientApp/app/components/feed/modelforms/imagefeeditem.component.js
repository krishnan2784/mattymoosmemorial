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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Enums = require("../../../enums");
var FeedTypeEnum = Enums.FeedTypeEnum;
var Feedclasses = require("../../../models/feedclasses");
var basepartialfeeditem_component_1 = require("./basepartialfeeditem.component");
var ImageFeedItemFormComponent = (function (_super) {
    __extends(ImageFeedItemFormComponent, _super);
    function ImageFeedItemFormComponent(injector) {
        return _super.call(this, injector, Feedclasses.ImageFeed, '/api/Feed/UpdateImageFeedItem', FeedTypeEnum.Image) || this;
    }
    ImageFeedItemFormComponent.prototype.addFormControls = function () {
        this.form.addControl('imageDescription', new forms_1.FormControl(this.model.imageDescription, []));
        this.form.addControl('mainImageId', new forms_1.FormControl(this.model.mainImageId, [forms_1.Validators.required]));
    };
    ;
    ImageFeedItemFormComponent.prototype.removeFormControls = function () {
        this.form.removeControl('imageDescription');
        this.form.removeControl('mainImageId');
    };
    ;
    return ImageFeedItemFormComponent;
}(basepartialfeeditem_component_1.BasePartialItemFormComponent));
ImageFeedItemFormComponent = __decorate([
    core_1.Component({
        selector: 'imagefeeditem',
        template: require('./imagefeeditem.component.html')
    }),
    __metadata("design:paramtypes", [core_1.Injector])
], ImageFeedItemFormComponent);
exports.ImageFeedItemFormComponent = ImageFeedItemFormComponent;
//# sourceMappingURL=imagefeeditem.component.js.map