import { Component, OnInit } from '@angular/core';
import {BrandingService} from "../../../services/brandingservice";
import {ShareService} from "../../../services/helpers/shareservice";
import {NavMenuOption} from "../../../models/navmenuclasses";
import {BrandingElement, BaseBrandingConfiguration, MarketBrandingConfiguration } from "../../../models/brandingclasses";
import { BaseComponent } from "../../base.component";

@Component({
	selector: 'branding-container',
	template: require('./brandingcontainer.component.html'),
	styles: [require('./brandingcontainer.component.css')]
})
export class BrandingContainerComponent extends BaseComponent implements OnInit {
	brandingConfigurations: BaseBrandingConfiguration[];
	brandingSections: BrandingElement[];
	activeBrandingSections: BrandingElement[];
	brandSectionNames: string[] = [];
	disabled: boolean = !(this.shareService.currentMarket.id === 1); // enable for ford global market by default (crude, but we don't have any other global flag)
	cs = this.changeSection.bind(this);

	constructor(public brandingService: BrandingService, public shareService: ShareService) {
		super(shareService, 'Customise my app', true);
	}

	ngOnInit() {
		this.getBranding();
		this.shareService.marketUpdated.subscribe(result => {
			this.activeBrandingSections = null;
			this.disabled = !(result.id === 1);
			this.getBranding();
		});
	}

	getBranding() {
		this.brandingService.getBranding().subscribe(result => {
			this.brandingConfigurations = [];
			if (!result)
				return;
			if (Array.isArray(result))
				this.brandingConfigurations = result;
			else
				this.brandingConfigurations.push(new BaseBrandingConfiguration(result));
			if (this.brandingConfigurations.length > 1) {
				let marketConfig = this.brandingConfigurations.find(x => (new MarketBrandingConfiguration(x)).marketId !== null);
				if (marketConfig) {
					this.brandingSections =
						this.brandingConfigurations[this.brandingConfigurations.indexOf(marketConfig)].brandingElements;
					this.disabled = false;
				}
			}
			if (!this.brandingSections)
				this.brandingSections = this.brandingConfigurations[0].brandingElements;
			for (let i = 0; i < this.brandingSections.length; i++) {
				this.brandingSections[i] = new BrandingElement(this.brandingSections[i]);
				if (this.brandSectionNames.indexOf(this.brandingSections[i].groupName) > -1) continue;
				this.brandSectionNames.push(this.brandingSections[i].groupName);
			}

			if (this.brandSectionNames.length > 0) {
				var menu = [];
				for (let i = 0; i < this.brandSectionNames.length; i++) {
					menu.push(new NavMenuOption(this.brandSectionNames[i],
						null,
						{
							onClick: this.cs,
							onClickParams: this.brandSectionNames[i]
						}));
				}
				this.shareService.updateMainNavMenu(menu);
				this.changeSection(this.brandSectionNames[0]);
			}
		});
	}

changeSection(brandingSection) {
	  this.activeBrandingSections = null;
	  this.activeBrandingSections = this.brandingSections.filter(x => x.groupName === brandingSection);
  }
}
