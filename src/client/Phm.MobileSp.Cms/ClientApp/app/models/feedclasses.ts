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

export class BaseFeed extends Baseclasses.BaseModel implements FeedModel.IFeedItem {
    allowFavourite: boolean;
    corporateApp: Corporateappclasses.CorporateApp;
    legalInformation: string;
    makeTitleWidgetLink: boolean;
    permissions: number;
    readingTime: number;
    startDate: Date;
    endDate: Date;
    title: string;
    shortDescription: string;
    feedType: Enums.FeedTypeEnum;
    feedCategory: FeedCategoryEnum;
    points: number;
    mainIcon: Mediainfoclasses.MediaInfo;
    marketId: string;

    constructor(options: {} = {}) {
        super(options);
        this.title = options['title'] || '';
        this.shortDescription = options['shortDescription'] || '';
        this.feedCategory = options['feedCategory'];
        this.points = options['points'] || '';
        this.mainIcon = options['mediaInfo'];
        this.marketId = options['marketId'];
        this.allowFavourite = options['allowFavourite'];
        this.corporateApp = options['corporateApp'];
        this.legalInformation = options['legalInformation'];
        this.makeTitleWidgetLink = options['makeTitleWidgetLink'];
        this.permissions = options['permissions'];
        this.readingTime = options['readingTime'];
        this.startDate = options['startDate'];
        this.endDate = options['endDate'];
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

export class ImageFeed extends BaseFeed {
    public imageDescription: string;
    public mainImage: MediaInfo;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Image;
        this.imageDescription = options['imageDescription'] || '';
        this.mainImage = options['mainImage'];
    }
}

export class QuizFeed extends BaseFeed {
    public questions: Quizclasses.QuizQuestion[];
    public quizDescription: string;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Quiz;
        this.questions = options['questions'] || '';
        this.quizDescription = options['quizDescription'];
    }
}


export class SurveyFeed extends BaseFeed {
    public questions: Surveyclasses.SurveyQuestion[];
    public surveyDescription: string;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Survey;
        this.questions = options['questions'] || '';
        this.surveyDescription = options['surveyDescription'];
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

export class VideoFeed extends BaseFeed {
    public videoDescription: string;
    public mainVideo: MediaInfo;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Video;
        this.videoDescription = options['videoDescription'] || '';
        this.mainVideo = options['mainVideo'];
    }
}
