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
var feeditemform_component_1 = require("../feed/modelforms/feeditemform.component");
var FeedItemModalComponent = (function () {
    function FeedItemModalComponent(resolver) {
        this.resolver = resolver;
        this.feedFormComponent = null;
    }
    Object.defineProperty(FeedItemModalComponent.prototype, "feedFormData", {
        set: function (data) {
            if (!data) {
                //this.closeModal.nativeElement.click();
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
    return FeedItemModalComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", Object)
], FeedItemModalComponent.prototype, "modal", void 0);
__decorate([
    core_1.ViewChild('closeModal'),
    __metadata("design:type", Object)
], FeedItemModalComponent.prototype, "closeModal", void 0);
__decorate([
    core_1.ViewChild('feedItemComponentContainer', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], FeedItemModalComponent.prototype, "dynamicComponentContainer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], FeedItemModalComponent.prototype, "feedFormData", null);
FeedItemModalComponent = __decorate([
    core_1.Component({
        selector: 'feed-form-component',
        entryComponents: [feeditemform_component_1.FeedItemForm],
        template: require('./feeditemmodal.component.html'),
        styles: [require('./feeditemmodal.component.css')],
    }),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
], FeedItemModalComponent);
exports.FeedItemModalComponent = FeedItemModalComponent;
//# sourceMappingURL=feeditemmodal.component.js.map