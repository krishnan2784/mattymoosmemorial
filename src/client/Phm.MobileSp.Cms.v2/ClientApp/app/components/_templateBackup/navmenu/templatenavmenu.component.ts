import { Component } from '@angular/core';

@Component({
    selector: 'template-nav-menu',
    templateUrl: './templatenavmenu.component.html',
    styleUrls: ['./templatenavmenu.component.css']
})

export class TemplateNavMenuComponent {
    collapse: string = "collapse";

    collapseNavbar(): void {
        if (this.collapse.length > 1) {
            this.collapse = "";
        } else {
            this.collapse = "collapse";
        }
    }

    collapseMenu() {
      this.collapse = "collapse";
    }
}
