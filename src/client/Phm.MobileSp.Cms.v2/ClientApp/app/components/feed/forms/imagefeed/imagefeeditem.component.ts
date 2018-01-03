import { Component, Injector } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import {BasePartialItemFormComponent} from "../basepartialfeeditem.component";
import {IFeedItemPartialForm} from "../../../../contracts/components/IFeedItemComponents";
import {ImageFeed} from "../../../../models/feedclasses";
import {MediaDataService} from "../../../../shared/services/mediaservice";
import {FeedTypeEnum} from "../../../../../enums";


@Component({
    selector: 'imagefeeditem', 
    template: require('./imagefeeditem.component.html')
})
export class ImageFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemPartialForm {
    model: ImageFeed;

    constructor(injector: Injector, public mediaDataService: MediaDataService) {
        super(injector, ImageFeed, FeedTypeEnum.Image);
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
