import {Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { FeedItemForm } from '../feed/modelforms/feeditemform.component';


@Component({
    selector: 'feed-form-component',
    entryComponents: [FeedItemForm], 
    template: require('./feeditemmodal.component.html'),
    styles: [require('./feeditemmodal.component.css')],
})
export class FeedItemModalComponent {
    feedFormComponent = null;
    
    @ViewChild('modal') modal; 
    @ViewChild('closeModal') closeModal; 

    
    @ViewChild('feedItemComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
    @Input() set feedFormData(data: { feedFormComponent: any, inputs: any }) {
        if (!data) {
            this.closeModal.nativeElement.click();
            return;
        }
        
        let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
        
        let factory = this.resolver.resolveComponentFactory(data.feedFormComponent);
        
        let component = factory.create(injector);
        
        this.dynamicComponentContainer.insert(component.hostView);
        
        if (this.feedFormComponent) {
            this.feedFormComponent.destroy();
        }

        this.feedFormComponent = component;
    }

    constructor(private resolver: ComponentFactoryResolver) {

    }
}
