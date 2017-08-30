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
        this.answers = options['answers'];
        this.order = options['order'] || 0;
        this.question = options['question']  || '';
        this.questionType = options['questionType'] || Enums.QuizQuestionTypeEnum.Single;
        this.quizFeedId = options['quizFeedId'] || 0;
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
        this.answer = options['answer'] || '';
        this.isCorrect = options['isCorrect'] || false;
        this.order = options['order'] || 0;
        this.quizQuestionId = options['quizQuestionId'] || 0;
    }
}