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