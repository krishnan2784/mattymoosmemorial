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
        this.id = options.id;
        this.enabled = options.enabled;
        this.published = options.published;
        this.masterId = options.masterId;
        this.createdAt = options.createdAt;
        this.deletedAt = options.deletedAt;
        this.updatedAt = options.updatedAt;
    }
}
