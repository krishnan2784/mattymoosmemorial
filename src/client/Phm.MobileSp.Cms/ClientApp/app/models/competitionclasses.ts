﻿import {BaseModel} from "./baseclasses";
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
		this.positionXBoosterRewardScheme = options['positionXBoosterRewardScheme'] || new PositionXBoosterRewardScheme();
		this.positionXBoosterRewardSchemeId = options['positionXBoosterRewardSchemeId'] || 0;
		this.startPosition = options['startPosition'] || 0;
		this.endPosition = options['endPosition'] || 0;
		this.xBooster = options['xBooster'] || 0;
	}
}

export class PositionXBoosterRewardScheme extends BaseRewardScheme {
	items: PositionXBoosterItem[];

	constructor(options: {} = {}) {
		super(options);
		this.items = options['items'];
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
		this.baseRewardSchemeId = options['baseRewardSchemeId'] || 0;
		this.baseRewardScheme = options['baseRewardScheme'] || new BaseRewardScheme();
		this.termsAndConditionId = options['termsAndConditionId'] || 0;
		this.termsAndCondition = options['termsAndCondition'] || new TermsAndCondition();
		this.title = options['title'] || '';
		this.about = options['about'] || '';
		this.startDate = options['startDate'];
		this.endDate = options['endDate'];
		this.mainImageId = options['mainImageId'] || 0;
		this.mainImage = options['mainImage'] || new MediaInfo();
		this.makeImageLink = options['makeImageLink'];
		this.linkTitle = options['linkTitle'] || '';
		this.linkUrl = options['linkUrl'] || '';
		this.activeImage = options['activeImage'] || new MediaInfo();
		this.activeImageId = options['activeImageId'] || 0;
		this.makeActiveImageLink = options['makeActiveImageLink'];
		this.completedImage = options['completedImage'] || new MediaInfo();
		this.completedImageId = options['completedImageId'] || 0;
		this.makeCompletedImageLink = options['makeCompletedImageLink'];
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