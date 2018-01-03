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

        let d = DateEx.formatDate(new Date());
        if (!this.createdAt) {
            this.createdAt = d;
        }
        if (!this.updatedAt) {
            this.updatedAt = d;
        }
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
