import Enums = require("../enums");
import Baseclasses = require("./baseclasses");
import BaseModel = Baseclasses.BaseModel;

export class QuizQuestion extends Baseclasses.BaseModel {
    public answers: QuizQuestionAnswer[];
    public order: number;
    public question: string;
    public questionType: Enums.QuizQuestionTypeEnum;
    public quizFeedId: number;

    constructor(options: {} = {}) {
        super(options);
        this.answers = options['Answers'];
        this.order = options['Order'] || 0;
        this.question = options['Question']  || '';
        this.questionType = options['QuestionType'] || Enums.QuizQuestionTypeEnum.Single;
        this.quizFeedId = options['QuizFeedId'] || 0;
        if (!this.answers) {
            this.answers = [];
            this.answers.push(new QuizQuestionAnswer());
            this.answers.push(new QuizQuestionAnswer());
        }
    }
}

export class QuizQuestionAnswer extends BaseModel {
    public answer: string;
    public isCorrect: boolean;
    public order: number;
    public quizQuestionId: number;

    constructor(options: {} = {}) {
        super(options);
        this.answer = options['Answer'] || '';
        this.isCorrect = options['IsCorrect'] || false;
        this.order = options['Order'] || 0;
        this.quizQuestionId = options['QuizQuestionId'] || 0;
    }
}