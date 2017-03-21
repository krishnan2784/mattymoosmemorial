import { Component } from '@angular/core';
import * as Enums from "../../enums";

@Component({
    selector: 'nav-menu',
    template: require('./navmenu.component.html'),
    styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent {
    public feedCats = Enums.FeedCategoryEnum;
}
