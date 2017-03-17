import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import { IFeedItem } from "../models/interfaces/feedinterfaces";
import * as Enums from "../enums";

@Component({
    selector: 'createfeedtypeselector',
    template: require('./createfeedtype.component.html')
})
export class CreateFeedTypeSelectorComponent {

    constructor() {
    }
}

