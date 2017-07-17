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
    selector: 'videofeeditem', 
    template: require('./videofeeditem.component.html')
})
export class VideoFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    model: Feedclasses.VideoFeed;

    constructor(injector: Injector) {
        super(injector, Feedclasses.VideoFeed, '/api/Feed/UpdateVideoFeedItem', FeedTypeEnum.Video);
    } 

    addFormControls() {
        this.form.addControl('videoDescription', new FormControl(this.model.videoDescription, []));
        this.form.addControl('mainVideoId', new FormControl(this.model.mainVideoId, []));

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