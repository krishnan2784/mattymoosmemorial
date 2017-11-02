import Enums = require("../enums");
import {BaseModel} from "./baseclasses";

export class SecUserFeaturePermission {
    public id: number;
    public userId: number;
	public featureBitmask: number;
	public featureUri: string;
	public featureHttpVerb: string;
    public allow: boolean;
	public secFeatureType: Enums.SecFeatureTypeEnum;
	
    constructor(options: {} = {}) {
        this.id = options['id'] || 0;
		this.userId = options['userId'] || 0;
		this.featureBitmask = options['featureBitmask'] || 0;
		this.featureUri = options['featureUri'] || '';
		this.featureHttpVerb = options['featureHttpVerb'] || '';
		this.allow = options['allow'] || false;
		this.secFeatureType = options['secFeatureType'];
    }
}

export class SecGroup extends BaseModel {
	name: string;
	description: string;
	maxUserCount: number;
	secEntityId: number;
	isBuiltIn: boolean;
	constructor(options: {} = {}) {
		super(options);
		this.name = options['name'] || '';
		this.description = options['description'] || '';
		this.maxUserCount = options['maxUserCount'] || 0;
		this.secEntityId = options['secEntityId'] || 0;
		this.isBuiltIn = options['isBuiltIn'] || false;
	}
}
