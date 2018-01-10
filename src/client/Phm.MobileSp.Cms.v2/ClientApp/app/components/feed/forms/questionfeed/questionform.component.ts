import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import {FeedTypeEnum} from "../../../../../enums";


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

    @Input('questionType')
    questionType: any;

    @Input()
    public submitted: boolean; 

    feedTypeEnum: typeof FeedTypeEnum = FeedTypeEnum;

    @Output()
    addAnswer: EventEmitter<any> = new EventEmitter();
    @Output()
    removeAnswer: EventEmitter<number> = new EventEmitter<number>();
    
    clearFormCheckboxes(index: number = null, checkbox = null) {
        var dynamicIndex: any;
        var answers = <FormArray>this.form.controls['answers'];
        var checked = checkbox ? checkbox.srcElement.checked : false;

        var controlName = "isFreeText";
        if (this.feedType === FeedTypeEnum.Quiz)
            controlName = "isCorrect";

        if (index!=null) {
            var questionType = this.form.controls['questionType'].value;
            if (questionType === this.questionType.Multiple && this.feedType === FeedTypeEnum.Quiz)
                return;  
            dynamicIndex = answers.controls[index];
        }

        answers.controls.forEach((control) => {
            var dynamic: any = control;
            if (dynamic.controls[controlName]) {
                dynamic.controls[controlName].patchValue(false, { onlySelf: true });
            }
        });

        if (index!=null) {
            dynamicIndex.controls[controlName].patchValue(checked, { onlySelf: true });
        }
    }
}
