import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { TextFeed } from '../../classes/feedclasses.ts';

@Component({
    //moduleId: module.id,
    selector: 'createlearningfeeditem',
    template: require('./createlearningfeeditem.component.html')
})
export class CreateLearningItemFormComponent {
    constructor() {
        var model = new TextFeed({});
        //submitted = false;
        //$('.save-feed').on('click', function() {
        //    $('.feed-item-form').submit();
        //});
    }
}
