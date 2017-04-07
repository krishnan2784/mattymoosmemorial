import { Component } from '@angular/core';
import { BaseComponent } from "../base.component";
import { ShareService } from "../../dataservices/datashareservice";

@Component({
    selector: 'home',
    template: require('./home.component.html')
})
export class HomeComponent extends BaseComponent  {
    constructor(sharedService: ShareService) {
        super(sharedService, '', false);
    }
}
