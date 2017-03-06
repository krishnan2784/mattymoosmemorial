import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import FeedItem = require("../classes/feedclasses");

@Component({
    //moduleId: module.id,
    selector: 'createfeeditem',
    template: require('./createfeeditem.component.html')
})
export class CreateFeedItemFormComponent {
    constructor() {
        //FormsModule.model = new FeedItem(0, );
        //submitted = false;
    }
}
