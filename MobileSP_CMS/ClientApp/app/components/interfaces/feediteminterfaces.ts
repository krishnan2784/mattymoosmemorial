import { Component, OnInit, Input } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { IFeedItem } from "../models/interfaces/feedinterfaces";

export interface IFeedItemForm {
    _fb: FormBuilder;
    form: FormGroup;
    model: IFeedItem;
    selectedFeedItemId: number;
    updateURL: string;
    deleteURL: string;
    getUrl: string;

    initialiseForm();
    addFormControls(form: FormGroup);
    getModel();

}