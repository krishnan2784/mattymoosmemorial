import { Component } from '@angular/core';
import {  } from '@types/jquery';
declare var $: JQueryStatic;

@Component({
    selector: 'app',
    template: require('./app.component.html'),
    styles: [require('./app.component.css')]
})
export class AppComponent {
}
