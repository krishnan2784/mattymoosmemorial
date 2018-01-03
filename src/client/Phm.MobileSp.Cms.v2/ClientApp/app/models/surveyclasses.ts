import * as Enums from "../../enums";
import { BaseModel } from "./baseclasses";

export class SurveyQuestion extends BaseModel {
    public answers: SurveyQuestionAnswer[];
    public order: number;
    public question: string;
    public questionType: Enums.SurveyQuestionTypeEnum;
    public surveyFeedId: number;

    constructor(options: {} = {}) {
        super(options);
        this.answers = options['answers'];
        this.order = options['order'] || 0;
        this.question = options['question'] || '';
        this.questionType = options['questionType'] || Enums.SurveyQuestionTypeEnum.Single;
        this.surveyFeedId = options['surveyFeedId'] || 0;
        if (!this.answers) {
            this.answers = [];
            this.answers.push(new SurveyQuestionAnswer());
            this.answers.push(new SurveyQuestionAnswer());
        }
    }
}

export class SurveyQuestionAnswer extends BaseModel {
    public answer: string;
    public isFreeText: boolean;
    public order: number;
    public surveyQuestionId: number;

    constructor(options: {} = {}) {
        super(options);
        this.answer = options['answer'] || '';
        this.isFreeText = options['isFreeText'] || false;
        this.order = options['order'] || 0;
        this.surveyQuestionId = options['surveyQuestionId'] || 0;
    }
}
