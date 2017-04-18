import Enums = require("../enums");
import Baseclasses = require("./baseclasses");

export class MediaInfo extends Baseclasses.BaseModel {
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
