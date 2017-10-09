import { Component, OnInit } from '@angular/core';
import {BrandingService} from "../../../services/brandingservice";
import {ShareService} from "../../../services/helpers/shareservice";
import {NavMenuOption} from "../../../models/navmenuclasses";
import {BrandingElement} from "../../../models/brandingclasses";

@Component({
    selector: 'branding-container',
    template: require('./brandingcontainer.component.html'),
    styles: [require('./brandingcontainer.component.css')]
})
export class BrandingContainerComponent implements OnInit {
  brandingSections: BrandingElement[];
  activeBrandingSections: BrandingElement[];
  brandSectionNames: string[] = [];
  constructor(public brandingService: BrandingService, public shareService: ShareService) {
  }

  ngOnInit() {
    this.brandingService.getMarketBranding(this.shareService.currentMarketId).subscribe(result => {
      this.brandingSections = result || [];
      for (let i = 0; i < this.brandingSections.length; i++) {
        if (this.brandSectionNames.indexOf(this.brandingSections[i].groupDescription) > -1) continue;
        this.brandSectionNames.push(this.brandingSections[i].groupDescription);
      }
      if (this.brandSectionNames.length > 0) {
        var menu = [];
        for (let i = 0; i < this.brandSectionNames.length; i++) {
          menu.push(new NavMenuOption(this.brandSectionNames[i], null, { onClick: this.changeSection(this.brandSectionNames[i]) }));
        }
        this.shareService.updateMainNavMenu(menu);
        this.changeSection(this.brandSectionNames[0]);
      }
    });
  }

  changeSection(brandingSection) {
    this.activeBrandingSections = this.brandingSections.filter(x => x.groupDescription === brandingSection);
  }
}
