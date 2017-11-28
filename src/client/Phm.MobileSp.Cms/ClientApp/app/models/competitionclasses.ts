import {BaseModel} from "./baseclasses";
import {MediaInfo} from "./mediainfoclasses";
import {Market} from "./marketclasses";
import {SecEntity} from "./securityclasses";
import {DateEx} from "../classes/helpers/date";

export class TermsAndCondition extends BaseModel {
	title: string;
	fullDescription: string;
	marketId: number;
	market: Market;

	constructor(options: {} = {}) {
		super(options);
		this.title = options['title'] || '';
		this.fullDescription = options['fullDescription'] || '';
		this.marketId = options['marketId'] || 0;
		this.market = options['market'] || new Market();
	}
}

export class BaseRewardScheme extends BaseModel {
	title: string;
	about: string;
	marketId: number;
	market: Market;

	constructor(options: {} = {}) {
		super(options);
		this.title = options['title'] || '';
		this.about = options['about'] || '';
		this.marketId = options['marketId'] || 0;
		this.market = options['market'] || new Market();
	}
}

export class PositionXBoosterItem extends BaseModel {
	positionXBoosterRewardScheme: PositionXBoosterRewardScheme;
	positionXBoosterRewardSchemeId: number;
	startPosition: number;
	endPosition: number;
	xBooster: number;

	constructor(options: {} = {}) {
		super(options);
		this.positionXBoosterRewardScheme = options['positionXBoosterRewardScheme'];
		this.positionXBoosterRewardSchemeId = options['positionXBoosterRewardSchemeId'] || 0;
		this.startPosition = options['startPosition'];
		this.endPosition = options['endPosition'];
		this.xBooster = options['xBooster'];
	}
}

export class PositionXBoosterRewardScheme extends BaseRewardScheme {
	items: PositionXBoosterItem[];

	constructor(options: {} = {}) {
		super(options);
		this.items = options['items'] || [];
		if (this.items.length === 0)
			this.items.push(new PositionXBoosterItem({}));
	}
}

export class Competition extends BaseModel {
	secEntityId: number;
	secEntity: SecEntity;
	marketId: number;
	market: Market;
	baseRewardSchemeId: number;
	baseRewardScheme: BaseRewardScheme;
	termsAndConditionId: number;
	termsAndCondition: TermsAndCondition;
	title: string;
	about: string;
	startDate: string;
	endDate: string;
	mainImageId: number;
	mainImage: MediaInfo;
	makeImageLink: boolean;
	linkTitle: string;
	linkUrl: string;
	activeImage: MediaInfo;
	activeImageId: number;
	makeActiveImageLink: boolean;
	completedImage: MediaInfo;
	completedImageId: number;
	makeCompletedImageLink: boolean;
	participants: number;

	constructor(options: {} = {}) {
		super(options);
		this.secEntityId = options['secEntityId'] || 0;
		this.secEntity = options['secEntity'] || new SecEntity();
		this.marketId = options['marketId'] || 0;
		this.market = options['market'] || new Market();
		this.baseRewardSchemeId = options['baseRewardSchemeId'];
		this.baseRewardScheme = options['baseRewardScheme'];
		this.termsAndConditionId = options['termsAndConditionId'];
		this.termsAndCondition = options['termsAndCondition'];
		this.title = options['title'] || '';
		this.about = options['about'] || '';
		this.startDate = options['startDate'];
		this.endDate = options['endDate'];
		this.mainImageId = options['mainImageId'] || 0;
		this.mainImage = options['mainImage'] || new MediaInfo();
		this.makeImageLink = options['makeImageLink'] || false;
		this.linkTitle = options['linkTitle'] || '';
		this.linkUrl = options['linkUrl'] || '';
		this.activeImage = options['activeImage'];
		this.activeImageId = options['activeImageId'];
		this.makeActiveImageLink = options['makeActiveImageLink'] || false;
		this.completedImage = options['completedImage'];
		this.completedImageId = options['completedImageId'];
		this.makeCompletedImageLink = options['makeCompletedImageLink'] || false;
		this.participants = options['participants'] || 0;
		this.formatDates();
	}

	public formatDates(competition: Competition = this) {
		let d = new Date();
		if (competition.startDate) {
			d = new Date(competition.startDate);
		}
		competition.startDate = DateEx.formatDate(d);
		let d2 = new Date();
		if (competition.endDate) {
			d2 = new Date(competition.endDate);
		} else {
			d2.setDate(d.getDate() + 14);
		}
		competition.endDate = DateEx.formatDate(d2);
	}
}

export class CompetitionSubset {
	id: number;
	baseRewardSchemeId:number;
	termsAndConditionId: number;
	title: string;
	startDate: string;
	endDate: string;
	participants: number;

	constructor(options: {} = {}) {
		this.id = options['id'] || 0;
		this.title = options['title'] || '';
		this.baseRewardSchemeId = options['baseRewardSchemeId'];
		this.termsAndConditionId = options['termsAndConditionId'];
		this.startDate = options['startDate'];
		this.endDate = options['endDate'];
		this.participants = options['participants'] || 0;
		this.formatDates();
	}

	public formatDates(competition: CompetitionSubset = this) {
		let d = new Date();
		if (competition.startDate) {
			d = new Date(competition.startDate);
		}
		competition.startDate = DateEx.formatDate(d);
		let d2 = new Date();
		if (competition.endDate) {
			d2 = new Date(competition.endDate);
		} else {
			d2.setDate(d.getDate() + 14);
		}
		competition.endDate = DateEx.formatDate(d2);
	}
}