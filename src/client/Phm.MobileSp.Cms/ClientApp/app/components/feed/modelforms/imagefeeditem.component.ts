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
import { MediaDataService } from "../../../services/mediaservice";

@Component({
    selector: 'imagefeeditem', 
    template: require('./imagefeeditem.component.html')
})
export class ImageFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    model: Feedclasses.ImageFeed;

    constructor(injector: Injector, public mediaDataService: MediaDataService) {
        super(injector, Feedclasses.ImageFeed, '/api/Feed/UpdateImageFeedItem', FeedTypeEnum.Image);
    } 

    addFormControls() {
        this.form.addControl('imageDescription', new FormControl(this.model.imageDescription, []));
        this.form.addControl('mainImageId', new FormControl(this.model.mainImageId, [<any>Validators.required]));      
        if (this.model && !this.model.mainImage && this.model.mainImageId > 0) {
            this.mediaDataService.getMediaInfo(this.model.mainImageId).subscribe((result) => {
                this.model.mainImage = result;
            });
        }
    };

    removeFormControls() {
        this.form.removeControl('imageDescription');
        this.form.removeControl('mainImageId');
    };
    
}