import {StringEx} from "../classes/helpers/string";
import {BaseModel} from "./baseclasses";
import {IFeedItem} from "../contracts/models/IFeedModel";
import {CorporateApp} from "./corporateappclasses";
import {FeedTypeEnum, FeedCategoryEnum } from "../../enums";
import {MediaInfo} from "./mediainfoclasses";
import {DateEx} from "../classes/helpers/date";
import {UserObservation} from "./observationclasses";
import {BaseFeedPage, TextFeedPage } from "./pagedfeedclasses";
import {QuizQuestion} from "./quizclasses";
import {SurveyQuestion} from "./surveyclasses";

export class BaseFeed extends BaseModel implements IFeedItem {
    allowFavourite: boolean;
    corporateApp: CorporateApp;
    legalInformation: string;
    makeTitleWidgetLink: boolean;
    permissions: number;
    readingTime: number;
    startDate: string;
    endDate: string;
    publishedLiveAt: Date;
    title: string;
    shortDescription: string;
    feedType: FeedTypeEnum;
    feedCategory: FeedCategoryEnum;
    points: number;
    mainIcon: MediaInfo;
    mainIconId: number;
    marketId: string;
    webUrlLink: string;
    callToActionText: string;
    callToActionUrl: string;
    tagText: string;
	competitionId: number;

	constructor(options: {} = {}) {
        super(options);
        this.title = options['title'] || '';
        this.shortDescription = options['shortDescription'] || '';
        this.feedCategory = options['feedCategory'];
        this.points = options['points'] || 0;
        this.mainIcon = options['mainIcon'];
        this.mainIconId = options['mainIconId'];
        this.marketId = options['marketId'];
        this.allowFavourite = options['allowFavourite'];
        this.allowFavourite = this.allowFavourite !== false;
        this.corporateApp = options['corporateApp'];
        this.legalInformation = options['legalInformation'];
        this.makeTitleWidgetLink = options['makeTitleWidgetLink'] || false;
        this.permissions = options['permissions'] || 0;
        this.readingTime = options['readingTime'] || 0;
        this.startDate = options['startDate'];
        this.endDate = options['endDate'];
        this.publishedLiveAt = options['publishedLiveAt'];
        this.webUrlLink = options['webUrlLink'] || '';
        this.callToActionText = options['callToActionText'] || '';
        this.callToActionUrl = options['callToActionUrl'] || '';
		    this.tagText = options['tagText'] || '';
		    this.competitionId = options['competitionId'] || null;
        this.formatFeedItemDates();
    }

    public formatFeedItemDates(feedItem: IFeedItem = this) {
        let d = new Date();
        if (feedItem.startDate) {
            d = new Date(feedItem.startDate);
        }
        feedItem.startDate = DateEx.formatDate(d);
        let d2 = new Date();
        if (feedItem.endDate) {
            d2 = new Date(feedItem.endDate);
        } else {
            d2.setDate(d.getDate() + 14);
        }
        feedItem.endDate = DateEx.formatDate(d2);
    }
}

export class TextFeed extends BaseFeed {
    public bodyText: string;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Text;
        this.bodyText = options['bodyText'] || '';
    }
}

export class ImageFeed extends BaseFeed {
    public imageDescription: string;
    public mainImage: MediaInfo;
    public mainImageId: number;
    public bodyText: string;

    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Image;
        this.imageDescription = options['imageDescription'] || '';
        this.mainImage = options['mainImage'];
        this.mainImageId = options['mainImageId'] || 0;
        this.bodyText = options['bodyText'] || '';
    }
}

export class VideoFeed extends BaseFeed {
  public videoDescription: string;
  public mainVideo: MediaInfo;
  public mainVideoId: number;
  public bodyText: string;

  constructor(options: {} = {}) {
    super(options);
    this.feedType = FeedTypeEnum.Video;
    this.videoDescription = options['videoDescription'] || '';
    this.mainVideo = options['mainVideo'];
    this.mainVideoId = options['mainVideoId'] || 0;
    this.bodyText = options['bodyText'] || '';
  }
}

export class QuizFeed extends BaseFeed {
    public questions: QuizQuestion[]; 
    public quizDescription: string;
    public onBoardingMessage: string;
    public successMessage: string;
    public failMessage: string;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Quiz;
        this.questions = options['questions'];
        this.quizDescription = options['quizDescription'] || '';
        this.onBoardingMessage = options['onBoardingMessage'] || '';
        this.successMessage = options['successMessage'] || '';
        this.failMessage = options['failMessage'] || '';
        if (!this.questions) {
            this.questions = [];
            this.questions.push(new QuizQuestion());
        }
    }
}


export class SurveyFeed extends BaseFeed {
    public questions: SurveyQuestion[];
    public surveyDescription: string;
    public completionMessage: string;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Survey;
        this.questions = options['questions'];
        this.surveyDescription = options['surveyDescription'] || '';
        this.completionMessage = options['completionMessage'] || '';
        if (!this.questions) {
            this.questions = [];
            this.questions.push(new SurveyQuestion());
        }
    }
}

export class ObservationFeed extends SurveyFeed {
    public userObservations: UserObservation[];
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Observation;
        this.userObservations = options['userObservation'] || [];
    }
}

export class PagedFeed extends BaseFeed {
    public baseFeedPages: BaseFeedPage[];

    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Paged;
        this.baseFeedPages = options['baseFeedPages'] || [];
	    if (!this.baseFeedPages || this.baseFeedPages.length === 0) {
		    this.baseFeedPages = [];
		    this.baseFeedPages.push(new TextFeedPage());
	    } else
		    this.baseFeedPages = StringEx.sortArray(this.baseFeedPages, ['pageNumber']);
    }
}
