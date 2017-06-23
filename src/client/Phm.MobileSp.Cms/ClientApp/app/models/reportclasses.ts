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

    constructor(options: {} = {}) {
        this.quizFeedId = options['quizFeedId'] || 0;
        this.averageScore = options['averageScore'] || 55.6;
        this.averageTime = options['averageTime'] || null;
        this.submitted = options['submitted'] || 100;
        this.passed = options['passed'] || 80;
        this.failed = options['failed'] || 20;
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
    public totalRightAnswers: number;
    public totalWrongAnswers: number;
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
        this.totalRightAnswers = options['totalRightAnswers'] || 0;
        this.totalWrongAnswers = options['totalWrongAnswers'] || 0;
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