import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { IFeedItem } from "../models/interfaces/feedinterfaces";
import Feedinterfaces = require("../models/interfaces/feedinterfaces");
import Enums = require("../enums");

export interface IFeedItemForm {
    _fb: FormBuilder;
    form: FormGroup;
    model: IFeedItem;
    selectedFeedItemId: number;
    subForm: IFeedItemPartialForm;

    initialiseForm();
    getModel();
}

export interface IFeedItemPartialForm {
    updateUrl: string;
    feedModelType: any;
    feedType: Enums.FeedTypeEnum;

    addFormControls(form: FormGroup) : FormGroup;
    removeFormControls(form: FormGroup) : FormGroup;
}