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
        this.extension = options['extension'] || '';
        this.marketId = options['marketId'];
        this.mediaId = options['mediaId'];
        this.mediaType = options['mediaType'];
        this.mediaVersion = options['mediaVersion'];
        this.name = options['name'];
        this.path = options['path'];
        this.preview1Path = options['preview1Path'];
        this.size = options['size'];
    }
}
