import { Component, Input, Output, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver, EventEmitter } from '@angular/core';
import {FeedItemCopyToMarket} from "../../feed/modals/copytomarket/copytomarket.component";
import {EditUser} from "../../accountmanagement/modals/edituser/edituser.component";


declare var $: any;

@Component({
    selector: 'base-modal',
    entryComponents: [FeedItemCopyToMarket, EditUser], 
    templateUrl: './basemodal.component.html',
    styleUrls: ['./basemodal.component.css']
})
export class BaseModalComponent {
    modelContent = null;

    @Input()
    public modalId: string;
    @Input()
    public modalHeader: string;
    @Input()
    public modalDescription: string;
    @Output()
    public modalClosed: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('modalContent', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
    @Input() set modalData(data: { modalContent: any, inputs: any }) {
      console.log(data);
        if (!data) {
            return;
        }

        data.modalContent.prototype.closeModalEvent = new EventEmitter<any>();
        data.modalContent.prototype.closeModalEvent.subscribe((data) => {
            this.closeModal(data);
        });

        data.modalContent.closeModalEvent = new EventEmitter;
        data.modalContent.closeModalEvent.subscribe((data) => {
            this.closeModal(data);
        });

        let inputProviders = Object.keys(data.inputs).map((inputName) => { return { provide: inputName, useValue: data.inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
        let factory = this.resolver.resolveComponentFactory((data.modalContent) as any);
        let component = factory.create(injector);
        
        this.dynamicComponentContainer.insert(component.hostView);
        
        if (this.modelContent) {
            this.modelContent.destroy();
        }

        this.modelContent = component;
    }

    constructor(private resolver: ComponentFactoryResolver) {

    }

    closeModal(data: any = null) {
        this.modalClosed.emit(data);
        $('#' + this.modalId + ' .modal-header button').click();
        this.modelContent = null;
        this.dynamicComponentContainer.clear();
    }
}
