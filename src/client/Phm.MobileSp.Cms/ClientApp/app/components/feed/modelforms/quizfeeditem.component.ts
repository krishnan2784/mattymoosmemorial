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
        (new Feedclasses.QuizFeed(this.model).questions).forEach(x=> formArray.push(this.initQuestion(x)));
        form.addControl('questions', formArray);
        
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
            id: new FormControl({value: question.id}, []),
            order: new FormControl({ value: question.order }, []),
            question: new FormControl(question.question, [<any>Validators.required, <any>Validators.minLength(5)]),
            questionType: new FormControl({ value: question.questionType }, [<any>Validators.required]),
            answers: formArray
        });
    }

    initAnswer(answer: QuizClasses.QuizQuestionAnswer) {
        return new FormGroup({
            id: new FormControl({ value: answer.id }, []),
            answer: new FormControl({ value: answer.answer }, [<any>Validators.required, <any>Validators.minLength(5)]),
            isCorrect: new FormControl({ value: answer.isCorrect }, []),
            order: new FormControl(answer.order, [])
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