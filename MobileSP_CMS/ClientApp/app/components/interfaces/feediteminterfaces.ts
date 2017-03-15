import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { IFeedItem } from "../models/interfaces/feedinterfaces";

export interface IFeedItemForm {
    _fb: FormBuilder;
    form: FormGroup;
    selectedFeedItemId: number;
    model: IFeedItem;
    initialiseForm();
    addFormControls(form: FormGroup);
}