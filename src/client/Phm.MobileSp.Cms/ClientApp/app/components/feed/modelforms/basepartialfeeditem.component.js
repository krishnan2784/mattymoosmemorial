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
var Enums = require("../../../enums");
var BasePartialItemFormComponent = (function () {
    function BasePartialItemFormComponent(injector, feedModelType, updateUrl, feedType) {
        this.injector = injector;
        this.feedModelType = feedModelType;
        this.updateUrl = updateUrl;
        this.feedType = feedType;
        if (injector) {
            this.form = injector.get('form');
            this.model = injector.get('model');
            this.feedFormSteps = injector.get('feedFormSteps');
        }
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
BasePartialItemFormComponent = __decorate([
    core_1.Component({}),
    __metadata("design:paramtypes", [core_1.Injector, Object, String, Number])
], BasePartialItemFormComponent);
exports.BasePartialItemFormComponent = BasePartialItemFormComponent;
//# sourceMappingURL=basepartialfeeditem.component.js.map