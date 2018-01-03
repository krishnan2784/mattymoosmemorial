import { Component, Output, EventEmitter } from '@angular/core';
import {IModalContent} from "../../contracts/components/IModalContent";

@Component({
    selector: 'basemodalcontent'
})
export class BaseModalContent implements IModalContent  {

    @Output()
    public closeModalEvent: EventEmitter<any>;

    closeModal(data: any = null) {
        this.closeModalEvent.emit(data);
    }
}
