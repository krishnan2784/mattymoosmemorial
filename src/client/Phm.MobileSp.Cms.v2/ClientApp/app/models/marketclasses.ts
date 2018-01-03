import { BaseModel } from "./baseclasses";

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
        this.brandId = options['brandId'] || 0;
        this.code = options['dealershipCode'] || '';
        this.defaultLanguageId = options['defaultLanguageId'] || 0;
        this.isLive = options['isLive'] || false;
        this.isMaster = options['isMaster'] || false;
        this.name = options['name'] || '';
        this.useMetricSystem = options['useMetricSystem'] || false;
    }
}
