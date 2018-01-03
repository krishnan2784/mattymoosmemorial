import { Component } from '@angular/core';
import {ShareService} from "../../../shared/services/helpers/shareservice";
import {FeedCategoryEnum} from "../../../../enums";

@Component({
  selector: 'nav-menu',
  template: require('./navmenu.component.html'),
  styles: [require('./navmenu.component.css')]
})
export class NavMenuComponent {
  public feedCats = FeedCategoryEnum;

  constructor(public shareService: ShareService) {
  }
}
