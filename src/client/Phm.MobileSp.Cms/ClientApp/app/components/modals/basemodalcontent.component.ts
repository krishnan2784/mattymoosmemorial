import { Component, Output, EventEmitter, Injector, Input } from '@angular/core';
import Feeddataservice = require("../../services/feeddataservice");
import FeedDataService = Feeddataservice.FeedDataService;
import ModalContent = require("../../interfaces/components/IModalContent");
import IModalContent = ModalContent.IModalContent;
import FeedModel = require("../../interfaces/models/IFeedModel");
import IFeedItem = FeedModel.IFeedItem;
import Datashareservice = require("../../services/helpers/shareservice");
import ShareService = Datashareservice.ShareService;
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

    closeModal() {
        this.closeModalEvent.emit(null);
    }
}
