"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Enums = require("../../../enums");
var FeedTypeEnum = Enums.FeedTypeEnum;
var Feedclasses = require("../../../models/feedclasses");
var basepartialfeeditem_component_1 = require("./basepartialfeeditem.component");
var mediaservice_1 = require("../../../services/mediaservice");
var VideoFeedItemFormComponent = (function (_super) {
    __extends(VideoFeedItemFormComponent, _super);
    function VideoFeedItemFormComponent(injector, mediaDataService) {
        var _this = _super.call(this, injector, Feedclasses.VideoFeed, '/api/Feed/UpdateVideoFeedItem', FeedTypeEnum.Video) || this;
        _this.mediaDataService = mediaDataService;
        return _this;
    }
    VideoFeedItemFormComponent.prototype.addFormControls = function () {
        var _this = this;
        this.form.addControl('videoDescription', new forms_1.FormControl(this.model.videoDescription, []));
        this.form.addControl('mainVideoId', new forms_1.FormControl(this.model.mainVideoId, [forms_1.Validators.required]));
        if (this.model && !this.model.mainVideo && this.model.mainVideoId > 0) {
            this.mediaDataService.getMediaInfo(this.model.mainVideoId).subscribe(function (result) {
                _this.model.mainVideo = result;
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
    ;
    VideoFeedItemFormComponent.prototype.removeFormControls = function () {
        this.form.removeControl('videoDescription');
        this.form.removeControl('mainVideoId');
    };
    ;
    return VideoFeedItemFormComponent;
}(basepartialfeeditem_component_1.BasePartialItemFormComponent));
VideoFeedItemFormComponent = __decorate([
    core_1.Component({
        selector: 'videofeeditem',
        template: require('./videofeeditem.component.html')
    }),
    __metadata("design:paramtypes", [core_1.Injector, mediaservice_1.MediaDataService])
], VideoFeedItemFormComponent);
exports.VideoFeedItemFormComponent = VideoFeedItemFormComponent;
//# sourceMappingURL=videofeeditem.component.js.map