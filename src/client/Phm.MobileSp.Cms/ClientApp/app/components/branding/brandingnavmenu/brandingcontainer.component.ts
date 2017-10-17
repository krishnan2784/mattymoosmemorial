import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {BrandingService} from "../../../services/brandingservice";
import {ShareService} from "../../../services/helpers/shareservice";
import {NavMenuOption} from "../../../models/navmenuclasses";
import {BrandingElement, BaseBrandingConfiguration, MarketBrandingConfiguration, BrandingConfigurationOption } from "../../../models/brandingclasses";
import { BaseComponent } from "../../base.component";

@
Component({
	selector: 'branding-container',
	template: require('./brandingcontainer.component.html'),
	styles: [require('./brandingcontainer.component.css')]
})
export class BrandingContainerComponent extends BaseComponent implements OnInit {
	brandingConfigurations: BaseBrandingConfiguration[];
	brandingSections: BrandingElement[];
	activeBrandingSections: BrandingElement[];
	brandingOptions: BrandingConfigurationOption[];
	brandSectionNames: string[] = [];
	disabled: boolean = false; 
	marketBranding: boolean = false;
	cs = this.changeSection.bind(this);

	constructor(public brandingService: BrandingService, public shareService: ShareService) {
		super(shareService, '', true);
	}

	ngOnInit() {
		this.getBranding();
		this.shareService.marketUpdated.subscribe(result => {
			this.brandingConfigurations = null;
			this.brandingSections = null;
			this.activeBrandingSections = null;
			this.brandingOptions = null;
			this.getBranding();
		});
	}

	getBranding() {
		this.brandingService.getBranding().subscribe(result => {
			this.brandingConfigurations = [];
			if (!result)
				return;
			if (Array.isArray(result.brandingConfigurations))
				this.brandingConfigurations = result.brandingConfigurations;
			else
				this.brandingConfigurations.push(new BaseBrandingConfiguration(result.brandingConfigurations));
			this.brandingOptions = result.brandingOptions;

			let marketConfig = this.brandingConfigurations.find(x => (new MarketBrandingConfiguration(x)).marketId > 0);

			if (marketConfig != null) {
				this.brandingSections =
					this.brandingConfigurations[this.brandingConfigurations.indexOf(marketConfig)].brandingElements;
				this.disabled = false;
				this.marketBranding = true;
			} else
				this.marketBranding = false;
			//	this.disabled = this.shareService.currentMarket.id > 1;

			if (this.brandingSections == null)
				this.brandingSections = this.brandingConfigurations[0].brandingElements;

			for (let i = 0; i < this.brandingSections.length; i++) {
				this.brandingSections[i] = new BrandingElement(this.brandingSections[i]);
				if (this.brandSectionNames.indexOf(this.brandingSections[i].groupName.split('>')[0]) > -1) continue;
				this.brandSectionNames.push(this.brandingSections[i].groupName.split('>')[0]);
			}

			if (this.brandSectionNames.length > 0) {
				var menu = [];
				for (let i = 0; i < this.brandSectionNames.length; i++) {
					menu.push(new NavMenuOption(this.brandSectionNames[i],
						null,
						{
							onClick: this.cs,
							activeLink: i === 0,
							onClickParams: this.brandSectionNames[i]
						}));
				}
				this.shareService.updateMainNavMenu(menu, "Customise my app");
				this.updateAppTheme('light-theme');
				this.changeSection(this.brandSectionNames[0]);
			}
		});
	}

	changeSection(brandingSection) {
	  this.activeBrandingSections = null;
	  this.activeBrandingSections = this.brandingSections.filter(x => x.groupName.split('>')[0] === brandingSection);
	  this.updatePageTitle(brandingSection);
  }
}
