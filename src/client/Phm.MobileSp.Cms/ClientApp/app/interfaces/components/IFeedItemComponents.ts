import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import FeedModel = require("../models/IFeedModel");
import Enums = require("../../enums");

export interface IFeedItemForm {
    _fb: FormBuilder;
    form: FormGroup;
    model: FeedModel.IFeedItem;
    subForm: IFeedItemPartialForm;

    initialiseForm();
    getModel();
}

export interface IFeedItemPartialForm {
    feedModelType: any;
    feedType: Enums.FeedTypeEnum;
    model: FeedModel.IFeedItem;

    addFormControls();
    removeFormControls();
}