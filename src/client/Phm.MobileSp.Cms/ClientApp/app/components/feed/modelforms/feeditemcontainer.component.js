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
var feeditemform_component_1 = require("./feeditemform.component");
var textfeeditem_component_1 = require("./textfeeditem.component");
var FeedItemContainerComponent = (function () {
    function FeedItemContainerComponent(resolver) {
        this.resolver = resolver;
        this.feedFormComponent = null;
    }
    Object.defineProperty(FeedItemContainerComponent.prototype, "feedFormData", {
        set: function (data) {
            if (!data) {
                return;
            }
            var inputProviders = Object.keys(data.inputs).map(function (inputName) { return { provide: inputName, useValue: data.inputs[inputName] }; });
            var resolvedInputs = core_1.ReflectiveInjector.resolve(inputProviders);
            var injector = core_1.ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
            var factory = this.resolver.resolveComponentFactory(data.feedFormComponent);
            var component = factory.create(injector);
            this.dynamicComponentContainer.insert(component.hostView);
            if (this.feedFormComponent) {
                this.feedFormComponent.destroy();
            }
            this.feedFormComponent = component;
        },
        enumerable: true,
        configurable: true
    });
    return FeedItemContainerComponent;
}());
__decorate([
    core_1.ViewChild('feedItemComponentContainer', { read: core_1.ViewContainerRef }),
    __metadata("design:type", typeof (_a = typeof core_1.ViewContainerRef !== "undefined" && core_1.ViewContainerRef) === "function" && _a || Object)
], FeedItemContainerComponent.prototype, "dynamicComponentContainer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], FeedItemContainerComponent.prototype, "feedFormData", null);
FeedItemContainerComponent = __decorate([
    core_1.Component({
        selector: 'feed-form-component',
        entryComponents: [feeditemform_component_1.FeedItemForm, textfeeditem_component_1.TextFeedItemFormComponent],
        template: require('./feeditemcontainer.component.html'),
        styles: [require('./feeditemcontainer.component.css')],
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof core_1.ComponentFactoryResolver !== "undefined" && core_1.ComponentFactoryResolver) === "function" && _b || Object])
], FeedItemContainerComponent);
exports.FeedItemContainerComponent = FeedItemContainerComponent;
var _a, _b;
//# sourceMappingURL=feeditemcontainer.component.js.map