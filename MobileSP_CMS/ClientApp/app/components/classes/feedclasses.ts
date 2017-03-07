import Enums = require("../enums");
import Baseclasses = require("./baseclasses");
import Quizclasses = require("./quizclasses");
import Surveyclasses = require("./surveyclasses");

export class BaseFeed extends Baseclasses.BaseModel {
    title: string;
    feedType: Enums.FeedTypeEnum;
    feedCategory: Enums.FeedCategoryEnum;
    points: number;
    mainIcon: Baseclasses.MediaInfo;
    marketId: string;

    constructor(options: {} = {}) {
        super(options);
        this.title = options['Title'] || '';
        this.feedType = options['FeedType'];
        this.feedCategory = options['FeedCategory'];
        this.points = options['Points'];
        this.mainIcon = options['MediaInfo'];
        this.marketId = options['MarketId'];
    }
}

export class CampaignFeed extends BaseFeed {
    public campaignDescription: string;
    public feeds: BaseFeed[];
    constructor(options: {} = {}) {
        super(options);
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
        this.questions = options['Questions'] || '';
        this.quizDescription = options['QuizDescription'];
    }
}


export class SurveyFeed extends BaseFeed {
    public questions: Surveyclasses.SurveyQuestion[];
    public surveyDescription: string;
    constructor(options: {} = {}) {
        super(options);
        this.questions = options['Questions'] || '';
        this.surveyDescription = options['surveyDescription'];
    }
}

export class TextFeed extends BaseFeed {
    public bodyText: string;
    constructor(options: {} = {}) {
        super(options);
        this.bodyText = options['BodyText'] || '';
    }
}

export class VideoFeed extends BaseFeed {
    public videoDescription: string;
    public mainVideo: Baseclasses.MediaInfo;
    constructor(options: {} = {}) {
        super(options);
        this.videoDescription = options['VideoDescription'] || '';
        this.mainVideo = options['MainVideo'];
    }
}
