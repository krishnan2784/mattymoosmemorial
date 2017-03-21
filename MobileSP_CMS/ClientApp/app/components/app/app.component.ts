import { Component } from '@angular/core';
import { FeedDataService } from "../../dataservices/feeddataservice";
import {  } from '@types/jquery';
declare var $: JQueryStatic;

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')],
    providers: [FeedDataService]
})
export class AppComponent {
}
