import * as Enums from "../enums";
import * as Baseclasses from "./baseclasses";
import BaseModel = Baseclasses.BaseModel;


export class SurveyQuestion extends BaseModel {
    public answers: SurveyQuestionAnswer[];
    public order: number;
    public question: string;
    public surveyQuestionTypeEnum: Enums.SurveyQuestionTypeEnum;
    public surveyFeedId: number;

    constructor(options: {} = {}) {
        super(options);
        this.answers = options['Answers'] || '';
        this.order = options['Order'];
        this.question = options['Question'];
        this.surveyQuestionTypeEnum = options['SurveyQuestionTypeEnum'];
        this.surveyFeedId = options['SurveyFeedId'];
    }
}

export class SurveyQuestionAnswer extends BaseModel {
    public answer: string;
    public isFreeText: boolean;
    public order: number;
    public surveyQuestionId: number;

    constructor(options: {} = {}) {
        super(options);
        this.answer = options['Answer'] || '';
        this.isFreeText = options['IsFreeText'];
        this.order = options['Order'];
        this.surveyQuestionId = options['SurveyQuestionId'];
    }
}
