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
var Copytomarketcomponent = require("../feed/modals/copytomarket.component");
var FeedItemCopyToMarket = Copytomarketcomponent.FeedItemCopyToMarket;
var Feedindexcomponent = require("../feed/indexes/feedindex.component");
var FeedIndexComponent = Feedindexcomponent.FeedIndexComponent;
var BaseModalComponent = (function () {
    function BaseModalComponent(resolver) {
        this.resolver = resolver;
        this.modelContent = null;
    }
    Object.defineProperty(BaseModalComponent.prototype, "modalData", {
        set: function (data) {
            if (!data) {
                return;
            }
            var inputProviders = Object.keys(data.inputs).map(function (inputName) { return { provide: inputName, useValue: data.inputs[inputName] }; });
            var resolvedInputs = core_1.ReflectiveInjector.resolve(inputProviders);
            var injector = core_1.ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
            var factory = this.resolver.resolveComponentFactory((data.modalContent));
            var component = factory.create(injector);
            this.dynamicComponentContainer.insert(component.hostView);
            if (this.modelContent) {
                this.modelContent.destroy();
            }
            this.modelContent = component;
        },
        enumerable: true,
        configurable: true
    });
    BaseModalComponent.prototype.closeModal = function () {
        this.modelContent = null;
        this.modalClosed.emit(null);
    };
    return BaseModalComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BaseModalComponent.prototype, "modalId", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BaseModalComponent.prototype, "modalTitle", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], BaseModalComponent.prototype, "modalClosed", void 0);
__decorate([
    core_1.ViewChild('modalContent', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], BaseModalComponent.prototype, "dynamicComponentContainer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], BaseModalComponent.prototype, "modalData", null);
BaseModalComponent = __decorate([
    core_1.Component({
        selector: 'base-modal',
        entryComponents: [FeedIndexComponent, FeedItemCopyToMarket],
        template: require('./basemodal.component.html'),
        styles: [require('./basemodal.component.css')],
    }),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
], BaseModalComponent);
exports.BaseModalComponent = BaseModalComponent;
//# sourceMappingURL=basemodal.component.js.map