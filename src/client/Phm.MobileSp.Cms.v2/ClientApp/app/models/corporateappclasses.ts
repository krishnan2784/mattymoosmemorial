import {AppTypeEnum} from "../../enums";
import {BaseModel} from "./baseclasses";

export class CorporateApp extends BaseModel {
    public appType: AppTypeEnum;
    public linkUrl: string;
    constructor(options: {} = {}) {
        super(options);
        this.appType = options['appType'];
        this.linkUrl = options['linkUrl'] || '';
    }
}
