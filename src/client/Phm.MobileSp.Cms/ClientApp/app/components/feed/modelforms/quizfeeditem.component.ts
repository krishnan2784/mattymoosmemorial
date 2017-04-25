import { Component, Input, Injector } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FeedItemForm } from "./feeditemform.component";
import { FeedDataService }  from "../../../dataservices/feeddataservice";
import * as IFeedItemComponents from "../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../enums");
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../models/feedclasses");
import Feedformstepsclasses = require("../../../models/feedformstepsclasses");
import FeedFormSteps = Feedformstepsclasses.FeedFormSteps;
import FeedModel = require("../../../interfaces/models/IFeedModel");
import { BasePartialItemFormComponent } from "./basepartialfeeditem.component";

@Component({
    selector: 'quizfeeditem',
    template: require('./quizfeeditem.component.html'),
    styles: [require('./quizfeeditem.component.css')],
})
export class QuizFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {

    answerType: typeof Enums.QuizQuestionTypeEnum = Enums.QuizQuestionTypeEnum;

    constructor(injector: Injector) {
        super(injector, Feedclasses.QuizFeed, '/api/Feed/UpdateQuizFeedItem', FeedTypeEnum.Quiz);
    } 

    addFormControls(form: FormGroup): FormGroup {
        var fb = new FormBuilder;
        form.addControl('questions',
            fb.array([
                fb.group({
                    id: ['', []],
                    order: ['', []],
                    question: ['', []],
                    questionType: ['', []],
                    'answers': fb.array([
                        fb.group({
                            id: ['', []],
                            answer: ['', []],
                            isCorrect: ['', []],
                            order: ['', []]
                        })
                    ])
                })                
            ])
        );
        return form;
    };

    removeFormControls(form: FormGroup): FormGroup {
        form.removeControl('questions');
        return form;
    };
    
}