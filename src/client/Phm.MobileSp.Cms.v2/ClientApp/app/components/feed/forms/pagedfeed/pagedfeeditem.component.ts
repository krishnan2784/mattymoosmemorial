import { Component, Injector, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms'
import { BasePartialItemFormComponent } from "../basepartialfeeditem.component";
import { PagedFeed } from "../../../../models/feedclasses";
import * as Pagedfeedclasses from "../../../../models/pagedfeedclasses";
import { MediaInfo } from "../../../../models/mediainfoclasses";
import {IFeedItemPartialForm} from "../../../../contracts/components/IFeedItemComponents";
import {FeedTypeEnum, BasePageFeedTypeEnum } from "../../../../../enums";
import {minLengthArray} from "../../../../classes/validators";


@Component({
    selector: 'pagedfeeditem',
    template: require('./pagedfeeditem.component.html'),
    styles: [require('../feeditemform.component.css'), require('./pagedfeeditem.component.css')]
})
export class PagedFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemPartialForm {
    public currentPage: number = 0;
    public model: PagedFeed;
    pageTypeEnum: typeof BasePageFeedTypeEnum = BasePageFeedTypeEnum;

    constructor(injector: Injector) {
        super(injector, PagedFeed, FeedTypeEnum.Paged);
    } 

    currPage(): any {
        var pages = <FormArray>this.form.controls['baseFeedPages'];
        return pages.controls[this.currentPage];
    }

    addFormControls() {
        var formArray = new FormArray([], <any>Validators.minLength(2));
        this.model.baseFeedPages.forEach((x, i) => formArray.push(this.initPage(x)));
        this.form.addControl('baseFeedPages', formArray);
        this.form.controls['baseFeedPages'].setValidators([Validators.required, minLengthArray(2), Validators.maxLength(5)]);
    };

    removeFormControls() {
        this.form.removeControl('baseFeedPages');
    };
    
    initPage(page: Pagedfeedclasses.BaseFeedPage = null): FormGroup {
        return new FormGroup({
            id: new FormControl(page.id, []),
            masterId: new FormControl(page.masterId, []),
            pageNumber: new FormControl(page.pageNumber, []),
            enabled: new FormControl(page.enabled, []),
            published: new FormControl(page.published, []),
            basePageFeedType: new FormControl(page.basePageFeedType, [<any>Validators.required]),
            pagedFeedId: new FormControl(page.pagedFeedId, []),
            title: new FormControl(page.title, [])
        });
    }

    addPage() {
        const control = <FormArray>this.form.controls['baseFeedPages'];
        control.push(this.initPage(new Pagedfeedclasses.TextFeedPage({ })));
        this.model.baseFeedPages.push(new Pagedfeedclasses.TextFeedPage({ }));
        this.displayPage(control.length - 1);
    }

    removePage(index: number) {
        const control = <FormArray>this.form.controls['baseFeedPages'];
        if (this.currentPage > 0)
            this.displayPage(this.currentPage - 1);
        control.removeAt(index);
        this.model.baseFeedPages.splice(index, 1);
        this.form.markAsDirty();
    }

    displayPage(index: number) {
        const pages = <FormArray>this.form.controls['baseFeedPages'];
        if (index < 0 || index > (pages.length - 1))
            return;
        this.currentPage = index;
    }

    attachMedia(media: MediaInfo) {
        var m = this.currPage().value;
        m.mediaInfoId = media.id;
        m.mediaInfo = media;
        this.model.baseFeedPages[this.currentPage] = m;
        this.currPage().controls.mediaInfoId.patchValue(media.id, { onlySelf: true });
        this.form.updateValueAndValidity();
    }

    pageHasProperty(modelType: BasePageFeedTypeEnum, propertyName: string): boolean {
        switch (propertyName) {
            case 'bodyText':
                return modelType === BasePageFeedTypeEnum.Text ||
                    modelType === BasePageFeedTypeEnum.MediaText;
            case 'mediaInfoId':
                return modelType === BasePageFeedTypeEnum.Media ||
                    modelType === BasePageFeedTypeEnum.MediaText ||
                    modelType === BasePageFeedTypeEnum.MediaTabbedText;
            case 'tabs':
                return modelType === BasePageFeedTypeEnum.TabbedText ||
                    modelType === BasePageFeedTypeEnum.MediaTabbedText;
        }
        return false;
    }
    
    changePageType(modelType: BasePageFeedTypeEnum) {
        var m;
        switch (modelType) {
            case this.pageTypeEnum.Text:
                m = new Pagedfeedclasses.TextFeedPage(this.currPage().value);
                break;
            case this.pageTypeEnum.Media:
                m = new Pagedfeedclasses.MediaFeedPage(this.currPage().value);
                break;
            case this.pageTypeEnum.MediaText:
                m = new Pagedfeedclasses.MediaTextFeedPage(this.currPage().value);
                break;
            case this.pageTypeEnum.TabbedText:
                m = new Pagedfeedclasses.TabbedTextFeedPage(this.currPage().value);
                break;
            case this.pageTypeEnum.MediaTabbedText:
                m = new Pagedfeedclasses.MediaTabbedTextFeedPage(this.currPage().value);
                break;
        }
        m.id = 0;
        this.model.baseFeedPages[this.currentPage] = m;
        this.updateCurrentPageProperty('id', 0);
        this.updateCurrentPageProperty('basePageFeedType', modelType);
    }

    updateCurrentPageProperty(propName, value) {
        this.model.baseFeedPages[this.currentPage][propName] = value;
        this.currPage().controls[propName].patchValue(value, { onlySelf: true });
    }
}
