import { Component, Output, EventEmitter, Injector, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { FeedDataService } from "../../../dataservices/FeedDataService";
import FeedModel = require("../../../interfaces/models/IFeedModel");
import IFeedItem = FeedModel.IFeedItem;
import ModalContent = require("../../../interfaces/components/IModalContent");
import IModalContent = ModalContent.IModalContent;
import Basemodalcontentcomponent = require("../../modals/basemodalcontent.component");
import BaseModalContent = Basemodalcontentcomponent.BaseModalContent;
import Datashareservice = require("../../../dataservices/datashareservice");
import ShareService = Datashareservice.ShareService;
declare var $: any;
declare var Materialize: any;

@Component({
    selector: 'feeditem-copytomarket',
    template: require('./copytomarket.component.html'),
    styles: [require('./copytomarket.component.css')],
    providers: [FeedDataService]
})
export class FeedItemCopyToMarket extends BaseModalContent implements IModalContent {
    
    model: IFeedItem;

    constructor(private injector: Injector, private feedDataService: FeedDataService, private sharedService: ShareService) {
        super();
        if (injector) {
            this.model = injector.get('feedItem');
        }
    } 

    saveChanges() {
        this.sharedService.updateFeedItem(this.model);
    }
}
