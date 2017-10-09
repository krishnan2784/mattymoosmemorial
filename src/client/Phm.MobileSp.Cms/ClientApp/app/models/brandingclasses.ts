import {BaseModel} from "./baseclasses";
import {MediaInfo} from "./mediainfoclasses";
import {BrandingElementType} from "../enums";

export class BrandingElement extends BaseModel {
  order: number;
  groupDescription: string;
  key: string;
  description: string;
  elementType: BrandingElementType;
  value: string;
  primaryImage: MediaInfo;
  primaryImageId: number;
  secondaryImage: MediaInfo;
  secondaryImageId: number;

  constructor(options: {} = {}) {
    super(options);
    this.order = options['order'] || 0;
    this.groupDescription = options['groupDescription'] || '';
    this.key = options['key'] || '';
    this.description = options['description'] || '';
    this.elementType = options['elementType'];
    this.value = options['value'] || '';
    this.primaryImage = options['primaryImage'] ||  new MediaInfo();
    this.primaryImageId = options['primaryImageId'] || 0;
    this.secondaryImage = options['secondaryImage'] || new MediaInfo();
    this.secondaryImageId = options['secondaryImageId'] || 0;
  }
}
