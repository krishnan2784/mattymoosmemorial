import { Component } from '@angular/core';
import Enums = require("../../enums");
import { ShareService } from "../../services/helpers/shareservice";
import { User } from "../../models/userclasses";

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent {
    public feedCats = Enums.FeedCategoryEnum;

    constructor(public shareService: ShareService) {
    }
}
