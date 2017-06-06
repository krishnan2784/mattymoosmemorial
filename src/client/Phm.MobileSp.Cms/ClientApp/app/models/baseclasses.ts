export class BaseModel {
    id: number;
    enabled: boolean;
    published: boolean;
    masterId: string;
    createdAt: Date;
    deletedAt: Date;
    updatedAt: Date;

    constructor(options: {
        id?: number,
        enabled?: boolean,
        published?: boolean,
        masterId?: string,
        createdAt?: Date,
        deletedAt?: Date,
        updatedAt?: Date,
    } = {}) {
        this.id = options.id || 0;
        this.enabled = options.enabled || true;
        this.published = options.published || false;
        this.masterId = options.masterId;
        this.createdAt = options.createdAt;
        this.deletedAt = options.deletedAt;
        this.updatedAt = options.updatedAt;
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
