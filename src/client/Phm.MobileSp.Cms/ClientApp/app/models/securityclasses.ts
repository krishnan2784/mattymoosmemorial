import {BaseModel} from "./baseclasses";
import {MediaInfo} from "./mediainfoclasses";
import { SecEntityTypeEnum } from "../enums";

export class SecEntity extends BaseModel {
	secEntityType: SecEntityTypeEnum;

	constructor(options: {} = {}) {
		super(options);
		this.secEntityType = options['secEntityType'];
	}
}
