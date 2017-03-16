import Enums = require("../enums");

export class BaseModel {
    Id: number;
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
        this.Id = options.id;
        this.enabled = options.enabled;
        this.published = options.published;
        this.masterId = options.masterId;
        this.createdAt = options.createdAt;
        this.deletedAt = options.deletedAt;
        this.updatedAt = options.updatedAt;
    }
}

export class MediaInfo extends BaseModel {
    public extension: string;
    public marketId: number;
    public mediaId: string;
    public mediaType: Enums.MediaTypes;
    public mediaVersion: number;
    public name: string;
    public path: string;
    public preview1Path: string;
    public size: number;

    constructor(options: {} = {}) {
        super(options);
        this.extension = options['Extension'] || '';
        this.marketId = options['MarketId'];
        this.mediaId = options['MediaId'];
        this.mediaType = options['MediaType'];
        this.mediaVersion = options['MediaVersion'];
        this.name = options['Name'];
        this.path = options['Path'];
        this.preview1Path = options['Preview1Path'];
        this.size = options['Size'];
    }
}
