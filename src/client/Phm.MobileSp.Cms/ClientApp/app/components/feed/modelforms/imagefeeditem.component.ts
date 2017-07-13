import { Component, Input, Injector } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeedItemForm } from "./feeditemform.component";
import { FeedDataService }  from "../../../services/feeddataservice";
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");
import Feedformstepsclasses = require("../../../classes/feedformstepsclasses");
import FeedFormSteps = Feedformstepsclasses.FeedFormSteps;
import FeedModel = require("../../../interfaces/models/IFeedModel");
import { BasePartialItemFormComponent } from "./basepartialfeeditem.component";

@Component({
    selector: 'imagefeeditem', 
    template: require('./imagefeeditem.component.html')
})
export class ImageFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    model: Feedclasses.ImageFeed;

    constructor(injector: Injector) {
        super(injector, Feedclasses.ImageFeed, '/api/Feed/UpdateImageFeedItem', FeedTypeEnum.Image);
    } 

    addFormControls() {
        this.form.addControl('imageDescription', new FormControl(this.model.imageDescription, []));
        this.form.addControl('mainImage', new FormGroup({
            id: new FormControl(this.model.mainImage.id, []),
            masterId: new FormControl(this.model.mainImage.masterId, []),
            marketId: new FormControl(this.model.mainImage.marketId, []),
            path: new FormControl(this.model.mainImage.path, []),
            name: new FormControl(this.model.mainImage.name, []),
            mediaType: new FormControl(this.model.mainImage.mediaType, [])
        }));
    };

    removeFormControls() {
        this.form.removeControl('imageDescription');
        this.form.removeControl('mainImage');
    };
    
}