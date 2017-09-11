import { Component, Injector } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
import * as IFeedItemComponents from "../../../../interfaces/components/IFeedItemComponents";
import Enums = require("../../../../enums");
import Basepartialfeeditemcomponent = require("../basepartialfeeditem.component");
import BasePartialItemFormComponent = Basepartialfeeditemcomponent.BasePartialItemFormComponent;
import FeedTypeEnum = Enums.FeedTypeEnum;
import Feedclasses = require("../../../../models/feedclasses");
import PagedFeed = Feedclasses.PagedFeed;
import Pagedfeedclasses = require("../../../../models/pagedfeedclasses");
import BaseFeedPage = Pagedfeedclasses.BaseFeedPage;

@Component({
    selector: 'pagedfeeditem',
    template: require('./pagedfeeditem.component.html'),
    styles: [require('../feeditemform.component.css'), require('./pagedfeeditem.component.css')]
})
export class PagedFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    public currentPage: number = 0;
    model: Feedclasses.PagedFeed;
    pageTypeEnum: typeof Enums.BasePageFeedTypeEnum = Enums.BasePageFeedTypeEnum;
    showAddPageOptions: boolean = false;

    constructor(injector: Injector) {
        super(injector, PagedFeed, FeedTypeEnum.Paged);
    } 

    currPage(): any {
        var pages = <FormArray>this.form.controls['baseFeedPages'];
        return pages.controls[this.currentPage];
    }

    addFormControls() {
        var formArray = new FormArray([], Validators.minLength(2), Validators.maxLength(5));
        this.model.baseFeedPages.forEach((x, i) => formArray.push(this.initPage(x)));
        this.form.addControl('baseFeedPages', formArray);
        this.form.controls['mainIconId'].setValidators(null);
    };

    removeFormControls() {
        this.form.removeControl('baseFeedPages');
        this.form.controls['mainIconId'].setValidators(Validators.required);
    };
    
    initPage(page: BaseFeedPage = null): FormGroup {
        return new FormGroup({
            id: new FormControl(page.id, []),
            masterId: new FormControl(page.masterId, []),
            pageNumber: new FormControl(page.pageNumber, []),
            enabled: new FormControl(page.enabled, []),
            published: new FormControl(page.published, []),
            basePageFeedType: new FormControl(page.basePageFeedType, [<any>Validators.required]),
            pagedFeedId: new FormControl(page.pagedFeedId, [<any>Validators.required]),
            title: new FormControl(page.title, [<any>Validators.required])
        });
    }

    addPage(basePageFeedType: Enums.BasePageFeedTypeEnum) {
        const control = <FormArray>this.form.controls['baseFeedPages'];
        control.push(this.initPage(new BaseFeedPage({ basePageFeedType })));
        this.displayPage(control.length - 1);
    }

    removePage(index: number) {
        const control = <FormArray>this.form.controls['baseFeedPages'];
        if (this.currentPage > 0)
            this.displayPage(this.currentPage - 1);
        control.removeAt(index);
        this.form.markAsDirty();
    }

    displayPage(index: number) {
        this.showAddPageOptions = false;
        const pages = <FormArray>this.form.controls['baseFeedPages'];
        if (index < 0 || index > (pages.length - 1))
            return;
        this.currentPage = index;
    }
}