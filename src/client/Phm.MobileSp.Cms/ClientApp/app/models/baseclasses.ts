import { DateEx } from "../classes/helpers/date";

export class BaseModel {
	id: number;
	enabled: boolean;
	published: boolean;
	masterId: string;
	createdAt: string;
	deletedAt: string;
	updatedAt: string;

	constructor(options: {} = {}) {
		this.id = options['id'] || 0;
		this.enabled = options['enabled'] || true;
		this.published = options['published'] || false;
		this.masterId = options['masterId'];
		this.createdAt = options['createdAt'];
		this.updatedAt = options['updatedAt'];

		this.formatDates();
	}

	public formatDates(bm: BaseModel = this) {
		let d = new Date();
		if (bm.createdAt) {
			d = new Date(bm.createdAt);
		}
		bm.createdAt = DateEx.formatDate(d);
		if (bm.updatedAt) {
			d = new Date(bm.updatedAt);
		} else {
			d = new Date();
		}
		bm.updatedAt = DateEx.formatDate(d);
	}
}

export class BasicBaseModel {
	id: number;
	createdAt: string;
	updatedAt: string;

	constructor(options: {} = {}) {
		this.id = options['id'] || 0;
		this.createdAt = options['createdAt'];
		this.updatedAt = options['updatedAt'];

		this.formatDates();
	}

	public formatDates(bm: BasicBaseModel = this) {
		let d = new Date();
		if (bm.createdAt) {
			d = new Date(bm.createdAt);
		}
		bm.createdAt = DateEx.formatDate(d);
		if (bm.updatedAt) {
			d = new Date(bm.updatedAt);
		} else {
			d = new Date();
		}
		bm.updatedAt = DateEx.formatDate(d);
	}
}

export class BaseVersionableEntity extends BaseModel {
    isPublishedLive: boolean;
    validVersion: boolean;
    version: number;
    constructor(options: {} = {}) {
        super(options);
        this.isPublishedLive = options['isPublishedLive'] || false;
        this.validVersion = options['validVersion'] || false;
        this.version = options['version'] || 0;
    }
}
