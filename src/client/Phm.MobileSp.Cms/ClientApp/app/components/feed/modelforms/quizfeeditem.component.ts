import { Component, Input, Injector } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeedItemForm } from "./feeditemform.component";
import { FeedDataService }  from "../../../dataservices/feeddataservice";
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");
import QuizClasses = require("../../../models/quizclasses");
import Feedformstepsclasses = require("../../../classes/feedformstepsclasses");
import FeedFormSteps = Feedformstepsclasses.FeedFormSteps;
import FeedModel = require("../../../interfaces/models/IFeedModel");
import { BasePartialItemFormComponent } from "./basepartialfeeditem.component";

declare var Materialize: any;

@Component({
    selector: 'quizfeeditem',
    template: require('./quizfeeditem.component.html'),
    styles: [require('./quizfeeditem.component.css')],
})
export class QuizFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    answerType: typeof Enums.QuizQuestionTypeEnum = Enums.QuizQuestionTypeEnum;
    public currentQuestion:number = 0;
    constructor(injector: Injector) {
        super(injector, Feedclasses.QuizFeed, '/api/Feed/UpdateQuizFeedItem', FeedTypeEnum.Quiz);
    } 

    addFormControls(form: FormGroup): FormGroup {
        var formArray = new FormArray([]);
        var qfiModel = new Feedclasses.QuizFeed(this.model);
        qfiModel.questions.forEach(x=> formArray.push(this.initQuestion(x)));
        form.addControl('questions', formArray);
        form.addControl('onBoardingMessage', new FormControl(qfiModel.onBoardingMessage, [<any>Validators.required, <any>Validators.minLength(5)]));
        form.addControl('successMessage', new FormControl(qfiModel.successMessage, [<any>Validators.required, <any>Validators.minLength(5)]));
        form.addControl('failMessage', new FormControl(qfiModel.failMessage, [<any>Validators.required, <any>Validators.minLength(5)]));       
       
        return form;
    };

    removeFormControls(form: FormGroup): FormGroup {
        form.removeControl('questions');
        return form;
    };

    initQuestion(question: QuizClasses.QuizQuestion = new QuizClasses.QuizQuestion()) {
        var formArray = new FormArray([]);
        question.answers.forEach(x => formArray.push(this.initAnswer(x)));

        return new FormGroup({
            id: new FormControl(question.id, []),
            quizFeedId: new FormControl(question.quizFeedId, []),
            masterId: new FormControl(question.masterId, []),
            order: new FormControl(question.order, []),
            enabled: new FormControl(question.enabled, []),
            published: new FormControl(question.published, []),
            question: new FormControl(question.question, [<any>Validators.required]),
            questionType: new FormControl(question.questionType, [<any>Validators.required]),
            answers: formArray
        });
    }

    initAnswer(answer: QuizClasses.QuizQuestionAnswer) {
        return new FormGroup({
            id: new FormControl(answer.id, []),
            quizQuestionId: new FormControl(answer.quizQuestionId, []),
            masterId: new FormControl(answer.masterId, []),
            order: new FormControl(answer.order, []),
            enabled: new FormControl(answer.enabled, []),
            published: new FormControl(answer.published, []),
            answer: new FormControl(answer.answer, [<any>Validators.required]),
            isCorrect: new FormControl( answer.isCorrect, [])
        });
    }

    addQuestion(question: QuizClasses.QuizQuestion = new QuizClasses.QuizQuestion()) {
        const control = <FormArray>this.form.controls['questions'];
        control.push(this.initQuestion(question));
        this.displayQuestion(control.length-1);
    }

    removeQuestion(index: number) {
        const questions = <FormArray>this.form.controls['questions'];
        if (this.currentQuestion > 0)
            this.displayQuestion(this.currentQuestion - 1);
        questions.removeAt(index);
    }

    displayQuestion(index: number) {
        const questions = <FormArray>this.form.controls['questions'];
        if (index < 0 || index > (questions.length - 1))
            return;
        this.currentQuestion = index;
        setTimeout(function () {
            Materialize.updateTextFields();
        }, 10);  
    }
}