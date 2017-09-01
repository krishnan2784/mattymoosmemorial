import { Component, Output, EventEmitter } from '@angular/core';
import ModalContent = require("../../interfaces/components/IModalContent");
import IModalContent = ModalContent.IModalContent;

declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'basemodalcontent'
})
export class BaseModalContent implements IModalContent  {

    @Output()
    public closeModalEvent: EventEmitter<any>;

    constructor() {
        
    }

    closeModal(data: any = null) {
        this.closeModalEvent.emit(data);
    }
}
