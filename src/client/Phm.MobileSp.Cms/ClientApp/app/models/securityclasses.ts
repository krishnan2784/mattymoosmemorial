import Enums = require("../enums");
import {BaseModel} from "./baseclasses";
import SecFeatureTypeEnum = Enums.SecFeatureTypeEnum;

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

export class SecFeature {
	id: number;
	createdAt: string;
	updatedAt: string;
	code: number;
	uri: string;
	httpVerb: string;
	bitMaskValue: number;
	secFeatureType: SecFeatureTypeEnum;

	constructor(options: {} = {}) {
		this.id = options['id'] || 0;
		this.createdAt = options['createdAt'] || '';
		this.updatedAt = options['updatedAt'] || '';
		this.code = options['code'] || 0;
		this.uri = options['uri'] || '';
		this.httpVerb = options['httpVerb'] || '';
		this.bitMaskValue = options['bitMaskValue'] || 0;
		this.secFeatureType = options['secFeatureType'] || Enums.SecFeatureTypeEnum.Cms;
	}
}

export class SecFeaturePermission {
	id: number;
	createdAt: string;
	updatedAt: string;
	secEntityId: number;
	secFeatureId: number;
	allow: boolean;

	constructor(options: {} = {}) {
		this.id = options['id'] || 0;
		this.createdAt = options['createdAt'] || '';
		this.updatedAt = options['updatedAt'] || '';
		this.secEntityId = options['secEntityId'] || 0;
		this.secFeatureId = options['secFeatureId'] || 0;
		this.allow = options['allow'];
	}
}