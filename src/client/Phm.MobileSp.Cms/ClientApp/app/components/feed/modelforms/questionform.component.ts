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
    
    constructor() {
    } 
    
    addAnswer() {
        const control = <FormArray>this.form.controls['answers'];
        control.push(new FormGroup({
            id: new FormControl('', []),
            quizQuestionId: new FormControl('', []),
            masterId: new FormControl('', []),
            order: new FormControl('', []),
            enabled: new FormControl(true, []),
            published: new FormControl(false, []),
            answer: new FormControl('', [<any>Validators.required]),
            isCorrect: new FormControl('', [])
        }));
    }

    removeAnswer(index: number) {
        const control = <FormArray>this.form.controls['answers'];
        control.removeAt(index);
    }
}