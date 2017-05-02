import { Component, Input } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import { QuizQuestion } from "../../../models/quizclasses";
import { QuizQuestionAnswer } from "../../../models/quizclasses";
import { SurveyQuestion } from "../../../models/surveyclasses";
import { SurveyQuestionAnswer } from "../../../models/surveyclasses";

@Component({
    selector: 'question',
    template: require('./questionform.component.html'),
    styles: [require('./questionform.component.css')]
})
export class QuestionFormComponent {
    @Input('feedType')
    public feedType: FeedTypeEnum;

    @Input('form')
    public form: FormGroup;

    @Input('model')
    public model: any;

    @Input('index')
    public index: number;
    questionType: typeof Enums.QuizQuestionTypeEnum = Enums.QuizQuestionTypeEnum;

    constructor() {
    } 
    
    addAnswer() {
        const control = <FormArray>this.form.controls['answers'];
        control.push(new FormGroup({
            id: new FormControl(0, []),
            quizQuestionId: new FormControl(0, []),
            masterId: new FormControl('', []),
            order: new FormControl(0, []),
            enabled: new FormControl(true, []),
            published: new FormControl(false, []),
            answer: new FormControl('', [<any>Validators.required]),
            isCorrect: new FormControl(false, [])
        }));
    }

    removeAnswer(index: number) {
        const control = <FormArray>this.form.controls['answers'];
        control.removeAt(index);
    }

    clearCorrect() {
        //var questionType = <FormArray>this.form.controls['questionType'];
        var answers = <FormArray>this.form.controls['answers'];
        answers.controls.forEach((control) => {
            var dynamic: any = control;
            if (dynamic.controls['isCorrect']) {
                dynamic.controls['isCorrect'].patchValue(false, { onlySelf: true });
            }
        });
    }
}