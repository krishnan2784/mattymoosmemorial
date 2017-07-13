import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import Enums = require("../enums");

declare var $: any;
declare var Materialize: any;

export class FeedFormSteps implements OnInit {
    private currentStep: FeedFormStep=null;
    private formType: Enums.FeedTypeEnum = Enums.FeedTypeEnum.Text;

    public steps: Observable<FeedFormStep[]>;
    public visibleSteps: FeedFormStep[] = [];
    public feedStepTypes: typeof FeedFormStepType = FeedFormStepType;

    constructor() {
        this.setupSteps();
    }
    
    ngOnInit() {

    }

    public setupSteps() {
        this.steps = Observable.create(observer => {
            var steps: FeedFormStep[] = [];
            steps.push(new FeedFormStep(FeedFormStepType.Category, 0, "Category"));
            steps.push(new FeedFormStep(FeedFormStepType.Main, 1, "Main"));
            if (this.formType === Enums.FeedTypeEnum.Quiz) {
                steps.push(new FeedFormStep(FeedFormStepType.QuizQuestions, 2, "Quiz Questions"));
                steps.push(new FeedFormStep(FeedFormStepType.QuizScore, 3, "Quiz Results"));
            } else if (this.formType === Enums.FeedTypeEnum.Survey || this.formType === Enums.FeedTypeEnum.Observation) {
                steps.push(new FeedFormStep(FeedFormStepType.SurveyQuestions, 2, "Survey Questions"));
                steps.push(new FeedFormStep(FeedFormStepType.SurveyScore, 3, "Survey Results"));
            } else {
                steps.push(new FeedFormStep(FeedFormStepType.Media, 2, "Media", "if required"));
                steps.push(new FeedFormStep(FeedFormStepType.Links, 3, "Links", "if required"));
            }
            observer.next(steps);
        });

        this.steps.subscribe((result) => {
            if (result.length) {
                this.visibleSteps = result;
                this.currentStep = result[0];
            }
        });
    }

    public setFormType(newFormType: Enums.FeedTypeEnum) {
        this.formType = newFormType;
        this.setupSteps();
    }

    public isPreviousButtonVisible(): boolean {
        return this.visibleSteps.filter(x => x.stepPosition > this.currentStep.stepPosition).length > 0;
    }

    public isNextButtonVisible(): boolean {
        return this.visibleSteps.filter(x => x.stepPosition < this.currentStep.stepPosition).length > 0;
    }

    public isCurrentStep(stepType: FeedFormStepType): boolean {
        return this.currentStep.type === stepType;
    }

    public navigateToPreviousStep() {
        var prevSteps = this.visibleSteps.filter(x => x.stepPosition < this.currentStep.stepPosition);
        this.currentStep = prevSteps[prevSteps.length - 1];
    }

    public navigateToNextStep() {
        this.currentStep = this.visibleSteps.filter(x => x.stepPosition > this.currentStep.stepPosition)[0];
    }

    public navigateToSelectedStep(selectedStep: FeedFormStepType) {
        this.currentStep = this.visibleSteps.find(x => x.type === selectedStep);
    }

}

export class FeedFormStep {
    constructor(public type: FeedFormStepType, public stepPosition: number, public name: string, public additionalText = "") { }
}

export enum FeedFormStepType {
    Category = 0,
    Main = 1,
    Media = 2,
    Links = 3,
    QuizQuestions = 4,
    QuizScore = 5,
    SurveyQuestions = 6,
    SurveyScore = 7,
}