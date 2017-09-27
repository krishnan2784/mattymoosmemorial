import FeedModel = require("../interfaces/models/IFeedModel");
import Enums = require("../enums");
import FeedCategoryEnum = Enums.FeedCategoryEnum;
import Mediainfoclasses = require("./mediainfoclasses");
import MediaInfo = Mediainfoclasses.MediaInfo;
import FeedTypeEnum = Enums.FeedTypeEnum;
import Quizclasses = require("./quizclasses");
import Surveyclasses = require("./surveyclasses");
import Baseclasses = require("./baseclasses");
import Corporateappclasses = require("./corporateappclasses");
import CorporateApp = Corporateappclasses.CorporateApp;
import Observationclasses = require("./observationclasses");
import UserObservation = Observationclasses.UserObservation;
import Date1 = require("../classes/helpers/date");
import DateEx = Date1.DateEx;
import Pagedfeedclasses = require("./pagedfeedclasses");
import BaseFeedPage = Pagedfeedclasses.BaseFeedPage;

export class BaseFeed extends Baseclasses.BaseModel implements FeedModel.IFeedItem {
    allowFavourite: boolean;
    corporateApp: Corporateappclasses.CorporateApp;
    legalInformation: string;
    makeTitleWidgetLink: boolean;
    permissions: number;
    readingTime: number;
    startDate: string;
    endDate: string;
    publishedLiveAt: Date;
    title: string;
    shortDescription: string;
    feedType: Enums.FeedTypeEnum;
    feedCategory: FeedCategoryEnum;
    points: number;
    mainIcon: Mediainfoclasses.MediaInfo;
    mainIconId: number;
    marketId: string;
    webUrlLink: string;
    callToActionText: string;
    callToActionUrl: string;
    tagText: string;
    
    constructor(options: {} = {}) {
        super(options);
        this.title = options['title'] || '';
        this.shortDescription = options['shortDescription'] || '';
        this.feedCategory = options['feedCategory'];
        this.points = options['points'] || 0;
        this.mainIcon = options['mainIcon'];
        this.mainIconId = options['mainIconId'];
        this.marketId = options['marketId'];
        this.allowFavourite = options['allowFavourite'] || true;
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
        this.formatFeedItemDates();
    }

    public formatFeedItemDates(feedItem: FeedModel.IFeedItem = this) {
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

export class CampaignFeed extends BaseFeed {
    public campaignDescription: string;
    public feeds: BaseFeed[];
    constructor(options: {} = {}) {
        super(options);
        this.feedCategory = FeedCategoryEnum.Campaign;
        this.feedType = options['feedType'];
        this.campaignDescription = options['campaignDescription'] || '';
        this.feeds = options['feeds'];
    }
}

export class ImageFeed extends TextFeed {
    public imageDescription: string;
    public mainImage: MediaInfo;
    public mainImageId: number;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Image;
        this.imageDescription = options['imageDescription'] || '';
        this.mainImage = options['mainImage'];
        this.mainImageId = options['mainImageId'] || 0;
    }
}

export class QuizFeed extends BaseFeed {
    public questions: Quizclasses.QuizQuestion[]; 
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
            this.questions.push(new Quizclasses.QuizQuestion());
        }
    }
}


export class SurveyFeed extends BaseFeed {
    public questions: Surveyclasses.SurveyQuestion[];
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
            this.questions.push(new Surveyclasses.SurveyQuestion());
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

export class VideoFeed extends TextFeed {
    public videoDescription: string;
    public mainVideo: MediaInfo;
    public mainVideoId: number;

    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Video;
        this.videoDescription = options['videoDescription'] || '';
        this.mainVideo = options['mainVideo'];
        this.mainVideoId = options['mainVideoId'] || 0;
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
            this.baseFeedPages.push(new Pagedfeedclasses.TextFeedPage());
        }
    }
}