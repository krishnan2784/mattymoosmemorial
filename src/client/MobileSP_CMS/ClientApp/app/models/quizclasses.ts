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
        this.answers = options['Answers'] || '';
        this.order = options['Order'];
        this.question = options['Question'];
        this.questionType = options['QuestionType'];
        this.quizFeedId = options['QuizFeedId'];
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
        this.isCorrect = options['IsCorrect'];
        this.order = options['Order'];
        this.quizQuestionId = options['QuizQuestionId'];
    }
}