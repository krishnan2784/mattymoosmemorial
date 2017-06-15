import {Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import Feeditemreportcomponent = require("./feeditemreport.component");
import FeedItemReport = Feeditemreportcomponent.FeedItemReport;

@Component({
    selector: 'feed-report-component',
    entryComponents: [FeedItemReport],
    template: require('./basefeeditemreport.component.html'),
    styles: [require('./basefeeditemreport.component.css')],
})
export class FeedItemReportContainerComponent {
    reportContent = null;
    
    @ViewChild('feedItemReportContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
    @Input() set feedReport(data: { reportContent: any, inputs: any }) {
        if (!data) {
            return;
        }
        
        let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
        
        let factory = this.resolver.resolveComponentFactory(data.reportContent);
        
        let component = factory.create(injector);
        
        this.dynamicComponentContainer.insert(component.hostView);
        
        if (this.reportContent) {
            this.reportContent.destroy();
        }

        this.reportContent = component;
    }

    constructor(private resolver: ComponentFactoryResolver) {

    }
}
