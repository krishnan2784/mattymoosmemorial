import Enums = require("../enums");
import Baseclasses = require("./baseclasses");
import BaseModel = Baseclasses.BaseModel;
import Mediainfoclasses = require("./mediainfoclasses");
import MediaInfo = Mediainfoclasses.MediaInfo;
import {DateEx} from "../classes/helpers/date";

export class BaseFeedPage {
	public id: number;
	public createdAt: string;
	public updatedAt: string;
    public pagedFeedId: number;
    public basePageFeedType: Enums.BasePageFeedTypeEnum;
    public pageNumber: number;
    public title: string;

	constructor(options: {} = {}) {
		this.id = options['id'] || 0;
		this.createdAt = options['createdAt'];
		this.updatedAt = options['updatedAt'];
        this.pagedFeedId = options['pagedFeedId'] || 0;
        this.basePageFeedType = options['basePageFeedType'] || Enums.BasePageFeedTypeEnum.Text;
        this.pageNumber = options['pageNumber'] || 0;
		this.title = options['title'] || '';

		let d = DateEx.formatDate(new Date());
		if (!this.createdAt) {
			this.createdAt = d;
		}
		if (!this.updatedAt) {
			this.updatedAt = d;
		}
    }
}

export class TextFeedPage extends BaseFeedPage {
    public bodyText: string;

    constructor(options: {} = {}) {
        super(options);
        this.basePageFeedType = Enums.BasePageFeedTypeEnum.Text;
        this.bodyText = options['bodyText'] || '';
    }
}

export class MediaTextFeedPage extends BaseFeedPage {
    public mediaInfo: MediaInfo;
    public mediaInfoId: number;
    public bodyText: string;

    constructor(options: {} = {}) {
        super(options);
        this.basePageFeedType = Enums.BasePageFeedTypeEnum.MediaText;
        this.mediaInfo = options['mediaInfo'];
        this.mediaInfoId = options['mediaInfoId'];
        this.bodyText = options['bodyText'] || '';
    }
}

export class MediaTabbedTextFeedPage extends BaseFeedPage {
    public mediaInfo: MediaInfo;
    public mediaInfoId: number;
    public tabs: TabText[];

    constructor(options: {} = {}) {
        super(options);
        this.basePageFeedType = Enums.BasePageFeedTypeEnum.MediaTabbedText;
        this.mediaInfo = options['mediaInfo'];
        this.mediaInfoId = options['mediaInfoId'];
        this.tabs = options['tabs'];

        if (!this.tabs) {
            this.tabs = [];
            this.tabs.push(new TabText());
        }
    }
}

export class MediaFeedPage extends BaseFeedPage {
    public mediaInfo: MediaInfo;
    public mediaInfoId: number;

    constructor(options: {} = {}) {
        super(options);
        this.basePageFeedType = Enums.BasePageFeedTypeEnum.Media;
        this.mediaInfo = options['mediaInfo'];
        this.mediaInfoId = options['mediaInfoId'];
    }
}

export class TabbedTextFeedPage extends BaseFeedPage {
    public tabs: TabText[];

    constructor(options: {} = {}) {
        super(options);
        this.basePageFeedType = Enums.BasePageFeedTypeEnum.TabbedText;
        this.tabs = options['tabs'];

        if (!this.tabs) {
            this.tabs = [];
            this.tabs.push(new TabText());
        }
    }
}

export class TabText {
	public id: number;
	public createdAt: string;
	public updatedAt: string;
    public mediaTabbedTextFeedPageId: number;
    public title: string;
    public bodyText: string;
    public order: number;

    constructor(options: {} = {}) {
	    this.id = options['id'] || 0;
	    this.createdAt = options['createdAt'];
	    this.updatedAt = options['updatedAt'];
        this.mediaTabbedTextFeedPageId = options['mediaTabbedTextFeedPageId'] || 0;
        this.title = options['title'] || '';
        this.bodyText = options['bodyText'] || '';
		this.order = options['order'] || 0;

	    let d = DateEx.formatDate(new Date());
	    if (!this.createdAt) {
		    this.createdAt = d;
	    }
	    if (!this.updatedAt) {
		    this.updatedAt = d;
	    }
    }
}
