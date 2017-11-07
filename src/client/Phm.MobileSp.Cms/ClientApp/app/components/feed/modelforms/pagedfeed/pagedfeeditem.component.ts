import { Component, Injector, Output, EventEmitter } from '@angular/core';
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
import Mediainfoclasses = require("../../../../models/mediainfoclasses");
import MediaInfo = Mediainfoclasses.MediaInfo;
import Validators1 = require("../../../../classes/validators");

@Component({
    selector: 'pagedfeeditem',
    template: require('./pagedfeeditem.component.html'),
    styles: [require('../feeditemform.component.css'), require('./pagedfeeditem.component.css')]
})
export class PagedFeedItemFormComponent extends BasePartialItemFormComponent implements IFeedItemComponents.IFeedItemPartialForm {
    public currentPage: number = 0;
    public model: Feedclasses.PagedFeed;
    pageTypeEnum: typeof Enums.BasePageFeedTypeEnum = Enums.BasePageFeedTypeEnum;

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
        this.form.controls['baseFeedPages'].setValidators([Validators.required, Validators1.minLengthArray(2), Validators.maxLength(5)]);
    };

    removeFormControls() {
        this.form.removeControl('baseFeedPages');
    };
    
    initPage(page: BaseFeedPage = null): FormGroup {
        return new FormGroup({
            id: new FormControl(page.id, []),
            createdAt: new FormControl(page.createdAt, []),
            updatedAt: new FormControl(page.updatedAt, []),
            pageNumber: new FormControl(page.pageNumber, []),
            basePageFeedType: new FormControl(page.basePageFeedType, [<any>Validators.required]),
            pagedFeedId: new FormControl(page.pagedFeedId, []),
            title: new FormControl(page.title, [])
        });
    }

    addPage() {
        const control = <FormArray>this.form.controls['baseFeedPages'];
		control.push(this.initPage(new Pagedfeedclasses.TextFeedPage({ pagedFeedId: this.model.id, pageNumber: control.length })));
		this.model.baseFeedPages.push(new Pagedfeedclasses.TextFeedPage({ pagedFeedId: this.model.id, pageNumber: control.length }));
        this.displayPage(control.length - 1);
    }

    removePage(index: number) {
        const control = <FormArray>this.form.controls['baseFeedPages'];
        if (this.currentPage > 0)
            this.displayPage(this.currentPage - 1);
        control.removeAt(index);
        this.model.baseFeedPages.splice(index, 1);
		this.form.markAsDirty();
	    this.updatePagenumbers(index);
    }

	updatePagenumbers(startIndex) {
		const pages = <FormArray>this.form.controls['baseFeedPages'];
		for (let i = startIndex; i < pages.length; i++) {
			var p: any = pages.controls[i];
			p.controls["pageNumber"].patchValue(p.controls["pageNumber"].value - 1, { onlySelf: true });
			this.model.baseFeedPages[i].pageNumber = this.model.baseFeedPages[i].pageNumber - 1;
		}
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

    pageHasProperty(modelType: Enums.BasePageFeedTypeEnum, propertyName: string): boolean {
        switch (propertyName) {
            case 'bodyText':
                return modelType === Enums.BasePageFeedTypeEnum.Text ||
                    modelType === Enums.BasePageFeedTypeEnum.MediaText;
            case 'mediaInfoId':
                return modelType === Enums.BasePageFeedTypeEnum.Media ||
                    modelType === Enums.BasePageFeedTypeEnum.MediaText ||
                    modelType === Enums.BasePageFeedTypeEnum.MediaTabbedText;
            case 'tabs':
                return modelType === Enums.BasePageFeedTypeEnum.TabbedText ||
                    modelType === Enums.BasePageFeedTypeEnum.MediaTabbedText;
        }
        return false;
    }
    
    changePageType(modelType: Enums.BasePageFeedTypeEnum) {
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