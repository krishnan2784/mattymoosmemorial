import { Component, Injector } from '@angular/core';
import { FormControl, Validators } from '@angular/forms'
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");
import { BasePartialItemFormComponent } from "./basepartialfeeditem.component";
import { MediaDataService } from "../../../services/mediaservice";

@Component({
    selector: 'videofeeditem', 
    template: require('./videofeeditem.component.html')
})
export class VideoFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    model: Feedclasses.VideoFeed;

    constructor(injector: Injector, public mediaDataService: MediaDataService) {
        super(injector, Feedclasses.VideoFeed, FeedTypeEnum.Video);

    } 

    addFormControls() {
        this.form.addControl('videoDescription', new FormControl(this.model.videoDescription, []));
        this.form.addControl('mainVideoId', new FormControl(this.model.mainVideoId, [<any>Validators.required]));
        if (this.model && !this.model.mainVideo && this.model.mainVideoId > 0) {
            this.mediaDataService.getMediaInfo(this.model.mainVideoId).subscribe((result) => {
                this.model.mainVideo = result;
            });
        }
        //this.form.addControl('mainVideo', new FormGroup({
        //    id: new FormControl(this.model.mainVideo.id, []),
        //    masterId: new FormControl(this.model.mainVideo.masterId, []),
        //    marketId: new FormControl(this.model.mainVideo.marketId, []),
        //    path: new FormControl(this.model.mainVideo.path, []),
        //    name: new FormControl(this.model.mainVideo.name, []),
        //    mediaType: new FormControl(this.model.mainVideo.mediaType, [])
        //}));
    };

    removeFormControls() {
        this.form.removeControl('videoDescription');
        this.form.removeControl('mainVideoId');
    };
    
}