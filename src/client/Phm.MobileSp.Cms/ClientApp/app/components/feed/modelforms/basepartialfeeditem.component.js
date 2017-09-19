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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Enums = require("../../../enums");
var Feedformstepsclasses = require("../../../classes/feedformstepsclasses");
var FeedFormSteps = Feedformstepsclasses.FeedFormSteps;
var FeedModel = require("../../../interfaces/models/IFeedModel");
var BasePartialItemFormComponent = (function () {
    function BasePartialItemFormComponent(injector, feedModelType, feedType) {
        this.injector = injector;
        this.feedModelType = feedModelType;
        this.feedType = feedType;
        this.mediaUploading = new core_1.EventEmitter();
    }
    BasePartialItemFormComponent.prototype.ngOnInit = function () {
        this.model = new this.feedModelType(this.model);
        this.addFormControls();
    };
    BasePartialItemFormComponent.prototype.ngOnDestroy = function () {
        this.removeFormControls();
    };
    BasePartialItemFormComponent.prototype.addFormControls = function () {
    };
    ;
    BasePartialItemFormComponent.prototype.removeFormControls = function () {
    };
    ;
    return BasePartialItemFormComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", forms_1.FormGroup)
], BasePartialItemFormComponent.prototype, "form", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", FeedFormSteps)
], BasePartialItemFormComponent.prototype, "feedFormSteps", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BasePartialItemFormComponent.prototype, "model", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BasePartialItemFormComponent.prototype, "submitted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BasePartialItemFormComponent.prototype, "mediaUploading", void 0);
BasePartialItemFormComponent = __decorate([
    core_1.Component({}),
    __metadata("design:paramtypes", [core_1.Injector, Object, Number])
], BasePartialItemFormComponent);
exports.BasePartialItemFormComponent = BasePartialItemFormComponent;
//# sourceMappingURL=basepartialfeeditem.component.js.map