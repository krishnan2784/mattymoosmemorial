import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { IFeedItem } from "../models/IFeedModel";
import { FeedTypeEnum } from "../../enums";

export interface IFeedItemForm {
    _fb: FormBuilder;
    form: FormGroup;
    model: IFeedItem;
    subForm: IFeedItemPartialForm;

    initialiseForm();
    getModel();
}

export interface IFeedItemPartialForm {
    updateUrl: string;
    feedModelType: any;
    feedType: FeedTypeEnum;

    addFormControls(form: FormGroup) : FormGroup;
    removeFormControls(form: FormGroup) : FormGroup;
}