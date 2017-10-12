import {BaseModel} from "./baseclasses";
import {MediaInfo} from "./mediainfoclasses";
import {BrandingElementType} from "../enums";

export class BrandingElement extends BaseModel {
	order: number;
	groupName: string;
  key: string;
  description: string;
  brandingElementType: BrandingElementType;
  value: string;
  primaryImage: MediaInfo;
  primaryImageId: number;
  secondaryImage: MediaInfo;
  secondaryImageId: number;

  constructor(options: {} = {}) {
    super(options);
    this.order = options['order'] || 0;
	this.groupName = options['groupName'] || '';
    this.key = options['key'] || '';
    this.description = options['description'] || 'This is for testing purposes only.';
	this.brandingElementType = options['brandingElementType'];
    this.value = options['value'] || '';
    this.primaryImage = options['primaryImage'] ||  new MediaInfo();
    this.primaryImageId = options['primaryImageId'] || 0;
    this.secondaryImage = options['secondaryImage'] || new MediaInfo();
    this.secondaryImageId = options['secondaryImageId'] || 0;
  }
}

export class BaseBrandingConfiguration extends BaseModel {
	brandId: number;
	version: number;
	brandingElements: BrandingElement[];

	constructor(options: {} = {}) {
		super(options);
		this.brandId = options['brandId'] || 0;
		this.version = options['version'] || 0;
		this.brandingElements = options['brandingElements'] || [];
	}
}

export class MarketBrandingConfiguration extends BaseBrandingConfiguration {
	marketId: number;

	constructor(options: {} = {}) {
		super(options);
		this.marketId = options['marketId'] || 0;
	}
}
