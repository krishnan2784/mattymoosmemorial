import { Component } from '@angular/core';
import { BaseComponent } from "../base.component";
import {ShareService} from "../../shared/services/helpers/shareservice";

@Component({
    selector: 'home',
    template: require('./home.component.html')
})
export class HomeComponent extends BaseComponent  {
    constructor(sharedService: ShareService) {
        super(sharedService, 'Welcome to MobileSP', false);
    }
}
