import Enums = require("../enums");
import Baseclasses = require("./baseclasses");

export class CorporateApp extends Baseclasses.BaseModel {
    public appType: Enums.AppTypeEnum;
    public linkUrl: string;
    constructor(options: {} = {}) {
        super(options);
        this.appType = options['appType'];
        this.linkUrl = options['linkUrl'] || '';
    }
}
