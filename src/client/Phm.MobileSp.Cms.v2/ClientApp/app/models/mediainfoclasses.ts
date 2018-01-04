import {BaseModel} from "./baseclasses";
import {MediaTypes} from "../../enums";

export class MediaInfo extends BaseModel {
    public extension: string;
    public marketId: number;
    public mediaId: string;
    public mediaType: MediaTypes;
    public mediaVersion: number;
    public name: string;
    public path: string;
    public preview1Path: string;
    public size: number;
    public azureUrl: string;

    constructor(options: {} = {}) {
        super(options);
        this.id = options['id'];
		    this.extension = options['extension'] || '';
        this.marketId = options['marketId'];
        this.mediaId = options['mediaId'];
        this.mediaType = options['mediaType'];
        this.mediaVersion = options['mediaVersion'];
        this.name = options['name'];
        this.path = options['path'];
        this.preview1Path = options['preview1Path'];
        this.size = options['size'];
        this.azureUrl = options['azureUrl'];
    }
}
