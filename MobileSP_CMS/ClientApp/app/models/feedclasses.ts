import * as Enums from "../enums";
import * as Baseclasses from "./baseclasses";
import * as Quizclasses from "./quizclasses";
import * as Surveyclasses from "./surveyclasses";
import * as IFeedModels from "../interfaces/models/IFeedModel";
import FeedTypeEnum = Enums.FeedTypeEnum;

export class BaseFeed extends Baseclasses.BaseModel implements IFeedModels.IFeedItem {
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
        this.points = options['points'] || '';
        this.mainIcon = options['mediaInfo'];
        this.marketId = options['marketId'];
    }
}

export class CampaignFeed extends BaseFeed {
    public campaignDescription: string;
    public feeds: BaseFeed[];
    constructor(options: {} = {}) {
        super(options);
        this.feedCategory = Enums.FeedCategoryEnum.Campaign;
        this.feedType = options['feedType'];
        this.campaignDescription = options['campaignDescription'] || '';
        this.feeds = options['feeds'];
    }
}

export class ImageFeed extends BaseFeed {
    public imageDescription: string;
    public mainImage: Baseclasses.MediaInfo;
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
    public mainVideo: Baseclasses.MediaInfo;
    constructor(options: {} = {}) {
        super(options);
        this.feedType = FeedTypeEnum.Video;
        this.videoDescription = options['videoDescription'] || '';
        this.mainVideo = options['mainVideo'];
    }
}
