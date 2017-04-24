
export class FeedFormSteps {
    steps: FeedFormStep[] = [];
    public currentStep: FeedFormStep;
    constructor() {
        this.steps.push(new FeedFormStep(FeedFormStepType.Category, 0, "Category", true));
        this.steps.push(new FeedFormStep(FeedFormStepType.Main, 1, "Main", true));
        this.steps.push(new FeedFormStep(FeedFormStepType.Media, 2, "Media (if required)", true));
        this.steps.push(new FeedFormStep(FeedFormStepType.QuizQuestions, 2, "Quiz Questions", false));
        this.steps.push(new FeedFormStep(FeedFormStepType.SurveyQuestions, 2, "Survey Questions", false));
        this.steps.push(new FeedFormStep(FeedFormStepType.Links, 3, "Links (if required)", true));
        this.steps.push(new FeedFormStep(FeedFormStepType.QuizAnswers, 2, "Quiz Answers", false));
        this.steps.push(new FeedFormStep(FeedFormStepType.SurveyAnswers, 2, "Survey Answers", false));

        this.currentStep = this.steps[0];
    }

    public isPreviousButtonVisible(): boolean {
        return this.steps.filter(x => x.stepPosition > this.currentStep.stepPosition && x.isVisible).length > 0;
    }

    public isNextButtonVisible(): boolean {
        return this.steps.filter(x => x.stepPosition < this.currentStep.stepPosition && x.isVisible).length > 0;
    }

    public navigateToPreviousStep() {
        var prevSteps = this.steps.filter(x => x.stepPosition < this.currentStep.stepPosition && x.isVisible);
        this.currentStep = prevSteps[prevSteps.length - 1];
    }

    public navigateToNextStep() {
        this.currentStep = this.steps.filter(x => x.stepPosition > this.currentStep.stepPosition && x.isVisible)[0];
    }

    public naviagetToSelectedStep(selectedStep: FeedFormStep) {
        this.currentStep = this.steps.find(x => x.type === selectedStep.type);
    }
}

export class FeedFormStep {
    constructor(public type: FeedFormStepType, public stepPosition: number,
        public name: string, public isVisible: boolean) { }
}

export enum FeedFormStepType {
    Category = 0,
    Main = 1,
    Media = 2,
    Links = 3,
    QuizQuestions = 4,
    QuizAnswers = 5,
    SurveyQuestions = 6,
    SurveyAnswers = 7,
}