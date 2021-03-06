import { Component, Injector } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators, AbstractControl } from '@angular/forms'
import {BasePartialItemFormComponent} from "../basepartialfeeditem.component";
import {IFeedItemPartialForm} from "../../../../contracts/components/IFeedItemComponents";
import {FeedTypeEnum} from "../../../../../enums";


@Component({
    selector: 'questionfeeditem',
    template: require('./basequestionfeeditem.component.html'),
    styles: [require('../feeditemform.component.css'), require('./basequestionfeeditem.component.css')]
})
export class BaseQuestionFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemPartialForm {
    public currentQuestion: number = 0;

    constructor(injector: Injector, feedModelType, feedType: FeedTypeEnum, public questionTypeEnum: any) {
        super(injector, feedModelType, feedType);
    }

    currQuestion(): any {
        var questions = <FormArray>this.form.controls['questions'];
        return questions.controls[this.currentQuestion];
    }

    baseQuestionForm(question: any): FormGroup {
        var formArray = new FormArray([], Validators.minLength(1));
        question.answers.forEach(x => formArray.push(this.initAnswer(x)));
        var fg = new FormGroup({
            id: new FormControl(question.id, []),
            masterId: new FormControl(question.masterId, []),
            order: new FormControl(question.order, []),
            enabled: new FormControl(question.enabled, []),
            published: new FormControl(question.published, []),
            question: new FormControl(question.question ? question.question : '', [<any>Validators.required]),
            questionType: new FormControl(question.questionType, [<any>Validators.required]),
            answers: formArray
        });
        return fg;
    };

    baseAnswerForm(answer: any): FormGroup {
        return new FormGroup({
            id: new FormControl(answer.id, []),
            masterId: new FormControl(answer.masterId, []),
            order: new FormControl(answer.order, []),
            enabled: new FormControl(answer.enabled, []),
            published: new FormControl(answer.published, []),
            answer: new FormControl(answer.answer, [<any>Validators.required])
        });
    };

    initQuestion(question: any = null): FormGroup { return null; }

    initAnswer(answer: any = null): FormGroup { return null; }

    addQuestion() {
        const control = <FormArray>this.form.controls['questions'];
        control.push(this.initQuestion());
        this.displayQuestion(control.length - 1);

    }

    removeQuestion(index: number) {
        const questions = <FormArray>this.form.controls['questions'];
        if (this.currentQuestion > 0)
            this.displayQuestion(this.currentQuestion - 1);
        questions.removeAt(index);
        this.form.markAsDirty();
    }

    addAnswer() {
        const control = this.currQuestion().controls['answers'];
        control.push(this.initAnswer());
    }

    removeAnswer(index: number) {
        const control = this.currQuestion().controls['answers'];
        control.removeAt(index);
        this.form.markAsDirty();

    }

    displayQuestion(index: number) {
        const questions = <FormArray>this.form.controls['questions'];
        if (index < 0 || index > (questions.length - 1))
            return;
        this.currentQuestion = index;
    }
}
