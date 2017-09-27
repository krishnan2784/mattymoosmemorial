import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms'
import PagedFeedClasses = require("../../../../models/pagedfeedclasses");
import Mediainfoclasses = require("../../../../models/mediainfoclasses");
import MediaInfo = Mediainfoclasses.MediaInfo;
import MediaTabbedTextFeedPage = PagedFeedClasses.MediaTabbedTextFeedPage;
import TabText = PagedFeedClasses.TabText;

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
        this.model.tabs.forEach((x, i) => formArray.push(this.initTab(x)));
        this.form.addControl('tabs', formArray);
        this.form.controls['tabs'].setValidators(Validators.maxLength(3));
    };

    removeFormControls() {
        this.form.removeControl('tabs');
    };

    initTab(tab: TabText = null): FormGroup {
        return new FormGroup({
            id: new FormControl(tab.id, []),
            masterId: new FormControl(tab.masterId, []),
            order: new FormControl(tab.order, []),
            enabled: new FormControl(tab.enabled, []),
            published: new FormControl(tab.published, []),
            mediaTabbedTextFeedtabId: new FormControl(tab.mediaTabbedTextFeedPageId, []),
            bodyText: new FormControl(tab.bodyText, [<any>Validators.required]),
            title: new FormControl(tab.title, [<any>Validators.required])
        });
    }

    addTab() {
        const control = <FormArray>this.form.controls['tabs'];
        control.push(this.initTab(new TabText()));
        this.displayTab(control.length - 1);
    }

    removeTab(index: number) {
        const control = <FormArray>this.form.controls['tabs'];
        if (this.currentTab > 0)
            this.displayTab(this.currentTab - 1);
        control.removeAt(index);
        this.form.markAsDirty();
    }

    displayTab(index: number) {
        const tabs = <FormArray>this.form.controls['tabs'];
        if (index < 0 || index > (tabs.length - 1))
            return;
        this.currentTab = index;
    }
}