import Enums = require("../enums");
import Baseclasses = require("./baseclasses");
import Quizclasses = require("./quizclasses");
import Surveyclasses = require("./surveyclasses");
import FeedInterfaces = require("./interfaces/feedinterfaces");
import FeedTypeEnum = Enums.FeedTypeEnum;

export class BaseFeed extends Baseclasses.BaseModel implements FeedInterfaces.IFeedItem {
    title: string;
    feedType: Enums.FeedTypeEnum;
    feedCategory: Enums.FeedCategoryEnum;
    points: number;
    mainIcon: Baseclasses.MediaInfo;
    marketId: string;

    constructor(options: {} = {}) {
        super(options);
        this.title = options['title'] || '';
        this.feedCategory = options['feedCategory'];
        this.points = options['points'];
        this.mainIcon = options['mediaInfo'];
        this.marketId = options['marketId'];
    }
}

export class CampaignFeed extends BaseFeed {
    public campaignDescription: string;
    public feeds: BaseFeed[];
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.CampaignFeed;
        this.campaignDescription = options['CampaignDescription'] || '';
        this.feeds = options['Feeds'];
    }
}

export class ImageFeed extends BaseFeed {
    public imageDescription: string;
    public mainImage: Baseclasses.MediaInfo;
    constructor(options: {} = {}) {
        super(options);
        this.imageDescription = options['ImageDescription'] || '';
        this.mainImage = options['MainImage'];
    }
}

export class QuizFeed extends BaseFeed {
    public questions: Quizclasses.QuizQuestion[];
    public quizDescription: string;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Quiz;
        this.questions = options['Questions'] || '';
        this.quizDescription = options['QuizDescription'];
    }
}


export class SurveyFeed extends BaseFeed {
    public questions: Surveyclasses.SurveyQuestion[];
    public surveyDescription: string;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Survey;
        this.questions = options['Questions'] || '';
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
    public mainVideo: Baseclasses.MediaInfo;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Video;
        this.videoDescription = options['VideoDescription'] || '';
        this.mainVideo = options['MainVideo'];
    }
}
