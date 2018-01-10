import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import {MediaTabbedTextFeedPage, TabText } from "../../../../../../models/pagedfeedclasses";
import {StringEx} from "../../../../../../classes/helpers/string";


@Component({
    selector: 'tabbed-text-page-form',
    template: require('./tabbedtextpageform.component.html'),
    styles: [require('./tabbedtextpageform.component.css')]
})
export class TabbedTextPageFormComponent implements OnInit, OnDestroy {
    public currentTab: number = 0;

    @Input('form')
    public form: FormGroup;

    @Input('model')
    public model;

    @Input('index')
    public index: number;

    @Input()
    public submitted: boolean;

    @Input()
    public isVisible: boolean; 
    
    ngOnInit() {
        this.model = new MediaTabbedTextFeedPage(this.model);
        this.addFormControls();
    }

    ngOnDestroy() {
        this.removeFormControls();
    }

    currTab(): any {
        var tabs = <FormArray>this.form.controls['tabs'];
        return tabs.controls[this.currentTab];
    }

    addFormControls() {
        var formArray = new FormArray([], <any>Validators.minLength(2));
	    StringEx.sortArray(this.model.tabs,['order']).forEach((x, i) => formArray.push(this.initTab(x)));
        this.form.addControl('tabs', formArray);
        this.form.controls['tabs'].setValidators(Validators.maxLength(3));
    };

    removeFormControls() {
        this.form.removeControl('tabs');
    };

    initTab(tab: TabText = null): FormGroup {
        return new FormGroup({
            id: new FormControl(tab.id, []),
            order: new FormControl(tab.order, []),
			tabbedTextFeedPageId: new FormControl(tab.tabbedTextFeedPageId, []),
            bodyText: new FormControl(tab.bodyText, [<any>Validators.required]),
            title: new FormControl(tab.title, [<any>Validators.required])
        });
    }

    addTab() {
        const control = <FormArray>this.form.controls['tabs'];
		control.push(this.initTab(new TabText({ tabbedTextFeedPageId: this.model.id, order: control.length })));
        this.displayTab(control.length - 1);
    }

    removeTab(index: number) {
        const control = <FormArray>this.form.controls['tabs'];
        if (this.currentTab > 0)
            this.displayTab(this.currentTab - 1);
        control.removeAt(index);
		this.form.markAsDirty();
		this.updateTabOrder(index);
    }

	updateTabOrder(startIndex) {
		const tabs = <FormArray>this.form.controls['tabs'];
		for (let i = startIndex; i < tabs.length; i++) {
			var p: any = tabs.controls[i];
			p.controls["order"].patchValue(p.controls["order"].value - 1, { onlySelf: true });
			this.model.tabs[i].order = this.model.tabs[i].order - 1;
		}
	}


    displayTab(index: number) {
        const tabs = <FormArray>this.form.controls['tabs'];
        if (index < 0 || index > (tabs.length - 1))
            return;
        this.currentTab = index;
    }
}
