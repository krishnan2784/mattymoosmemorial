import Account = require("../interfaces/models/IUserAccount");
import Baseclasses = require("./baseclasses");
import BaseModel = Baseclasses.BaseModel;
import BaseVersionableEntity = Baseclasses.BaseVersionableEntity;

export class Market extends BaseModel {
    brandId: number;
    code: string;
    defaultLanguageId: number;
    isLive: boolean;
    isMaster: boolean;
    name: string;
    useMetricSystem: boolean;
    constructor(options: {} = {}) {
        super(options);
        this.brandId = options['brandId'] || '';
        this.code = options['dealershipCode'] || '';
        this.defaultLanguageId = options['defaultLanguageId'] || '';
        this.isLive = options['isLive'] || false;
        this.isMaster = options['isMaster'] || false;
        this.name = options['name'] || '';
        this.useMetricSystem = options['useMetricSystem'] || false;
    }
}