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
var Feeditemreportcomponent = require("./quizfeeditemreport.component");
var surveyfeeditemreport_component_1 = require("./surveyfeeditemreport.component");
var observationfeeditemreport_component_1 = require("./observationfeeditemreport.component");
var QuizFeedItemReport = Feeditemreportcomponent.QuizFeedItemReport;
var FeedItemReportContainerComponent = (function () {
    function FeedItemReportContainerComponent(resolver) {
        this.resolver = resolver;
        this.reportContent = null;
    }
    Object.defineProperty(FeedItemReportContainerComponent.prototype, "feedReport", {
        set: function (data) {
            if (!data) {
                return;
            }
            var inputProviders = Object.keys(data.inputs).map(function (inputName) { return { provide: inputName, useValue: data.inputs[inputName] }; });
            var resolvedInputs = core_1.ReflectiveInjector.resolve(inputProviders);
            var injector = core_1.ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
            var factory = this.resolver.resolveComponentFactory(data.reportContent);
            var component = factory.create(injector);
            this.dynamicComponentContainer.insert(component.hostView);
            if (this.reportContent) {
                this.reportContent.destroy();
            }
            this.reportContent = component;
        },
        enumerable: true,
        configurable: true
    });
    return FeedItemReportContainerComponent;
}());
__decorate([
    core_1.ViewChild('feedItemReportContainer', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], FeedItemReportContainerComponent.prototype, "dynamicComponentContainer", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], FeedItemReportContainerComponent.prototype, "feedReport", null);
FeedItemReportContainerComponent = __decorate([
    core_1.Component({
        selector: 'feed-report-component',
        entryComponents: [QuizFeedItemReport, surveyfeeditemreport_component_1.SurveyFeedItemReport, observationfeeditemreport_component_1.ObservationFeedItemReport],
        template: require('./basefeeditemreport.component.html'),
        styles: [require('./basefeeditemreport.component.css')],
    }),
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver])
], FeedItemReportContainerComponent);
exports.FeedItemReportContainerComponent = FeedItemReportContainerComponent;
//# sourceMappingURL=basefeeditemreport.component.js.map