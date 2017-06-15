export class FeedItemSummary {
    public quizFeedId: number;
    public averageScore: number;
    public averageTime: any;
    public submitted: number;
    public passed: number;
    public failed: number;

    constructor(options: {} = {}) {
        this.quizFeedId = options['qurveyQuestionId'] || 0;
        this.averageScore = options['averageScore'] || 0;
        this.averageTime = options['averageTime'] || null;
        this.submitted = options['submitted'] || 0;
        this.passed = options['passed'] || 0;
        this.failed = options['failed'] || 0;
    }
}