import Baseclasses = require("./baseclasses");
import BaseModel = Baseclasses.BaseModel;
import Userclasses = require("./userclasses");
import User = Userclasses.User;

export class FeedItemSummary {
    public quizFeedId: number;
    public averageScore: number;
    public averageTime: any;
    public submitted: number;
    public passed: number;
    public failed: number;
    public submissions: [string,number][];

    constructor(options: {} = {}) {
        this.quizFeedId = options['quizFeedId'] || 0;
        this.averageScore = options['averageScore'] || 55.6;
        this.averageTime = options['averageTime'] || null;
        this.submitted = options['submitted'] || 100;
        this.passed = options['passed'] || 80;
        this.failed = options['failed'] || 20;
        this.submissions = options['submissions'];
    }
}

export class FeedItemSummaryEx extends BaseModel
{
    public finishedAt: Date;
    public mainUserGroup: string;
    public dealershipName: string;
    public minSucceedThreshold: number;
    public pointsGained: number;
    public quizFeedId: number;
    public quizFeedResults: QuizFeedResult[];
    public resultPercentage: number;
    public startedAt: Date;
    public totalQuestions: number;
    public totalRightQuestions: number;
    public user: User;

    constructor(options: {} = {})
    {
        super(options);
        this.finishedAt = options['finishedAt'];
        this.mainUserGroup = options['mainUserGroup'] || '';
        this.dealershipName = options['dealershipName'] || '';
        this.minSucceedThreshold = options['minSucceedThreshold'] || 0;
        this.pointsGained = options['pointsGained'] || 0;
        this.quizFeedId = options['quizFeedId'] || 0;
        this.quizFeedResults = options['quizFeedResults'];
        this.resultPercentage = options['resultPercentage'] || 0;
        this.startedAt = options['startedAt'];
        this.totalQuestions = options['totalQuestions'] || 0;
		this.totalRightQuestions = options['totalRightQuestions'] || 0;
        this.user = options['user'];
    }
}

export class QuizFeedResult extends BaseModel
{
    public isSelected: boolean; 
    public quizAnswerId: number;
    public quizFeedId: number;
    public quizQuestionId: number;
    public userId: number;
    constructor(options: {} = {}) {
        super(options);
        this.isSelected = options['isSelected'] || false;
        this.quizAnswerId = options['quizAnswerId'] || 0;
        this.quizFeedId = options['quizFeedId'] || 0;
        this.quizQuestionId = options['quizQuestionId'] || 0;
        this.userId = options['userId'] || 0;
    }
}

export class SurveyItemSummary extends FeedItemSummary {
    public surveyFeedResults: SurveyFeedResult[];
    public totalRecipents: number;
    public submitted: number;
    public surveyFeedId: number;
    constructor(options: {} = {}) {
        super(options);
        this.surveyFeedResults = options["surveyQuestionSummaries"];
        this.surveyFeedId = options["surveyFeedId"] || 0;
        this.totalRecipents = options["totalRecipents"] || 0;
        this.submitted = options["submitted"] || 0;
    }
}

export class SurveyFeedResult extends BaseModel {
    public surveyAnswerSummaries: SurveyFeedAnswerResult[];
    public surveyQuestionId: number;
    public surveySummaryId: number;
    constructor(options: {} = {}) {
        super(options);
        this.surveyAnswerSummaries = options['surveyAnswerSummaries'];
        this.surveyQuestionId = options['surveyQuestionId'] || 0;
        this.surveySummaryId = options['surveySummaryId'] || 0;
    }
}

export class SurveyFeedAnswerResult extends BaseModel {
    public surverQuestionAnwerId: number;
    public surveyQuestionSummaryId: number;
    public totalSelected: number;
    public percentage: number;
    constructor(options: {} = {}) {
        super(options);
        this.surverQuestionAnwerId = options['surverQuestionAnwerId'] || 0;
        this.surveyQuestionSummaryId = options['surveyQuestionSummaryId'] || 0;
        this.totalSelected = options['totalSelected'] || 0;
        this.percentage = options['percentage'] || 0;
    }
}

export class ObservationItemSummary extends SurveyItemSummary {
    public observationFeedId: number;
    constructor(options: {} = {}) {
        super(options);
        this.observationFeedId = options["surveyFeedId"] || 0;
    }
}