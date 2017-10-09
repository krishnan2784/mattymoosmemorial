import { Component, OnInit } from '@angular/core';
import {BrandingService} from "../../../services/brandingservice";
import {ShareService} from "../../../services/helpers/shareservice";
import {NavMenuOption} from "../../../models/navmenuclasses";

@Component({
    selector: 'branding-nav-menu',
    template: require('./brandingnavmenu.component.html'),
    styles: [require('./brandingnavmenu.component.css')]
})
export class BrandingNavMenuComponent implements OnInit {
  brandingSections: any[];
  activeBrandSection: any;
  constructor(public brandingService: BrandingService, public shareService: ShareService) {

  }

  ngOnInit() {
    this.brandingService.getMarketBranding(this.shareService.currentMarketId).subscribe(result => {
      this.brandingSections = result || [];
    });
    this.shareService.updateMainNavMenu([
      new NavMenuOption('Dashboard', null, {onClick: this.changeSection({})})
    ]);
  }

  changeSection(brandingSection) {
    this.activeBrandSection = brandingSection;
  }
}
