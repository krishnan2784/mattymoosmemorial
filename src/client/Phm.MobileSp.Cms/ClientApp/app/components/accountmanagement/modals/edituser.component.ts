import { Component, Output, EventEmitter, Injector, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import ModalContent = require("../../../interfaces/components/IModalContent");
import IModalContent = ModalContent.IModalContent;
import Basemodalcontentcomponent = require("../../modals/basemodalcontent.component");
import BaseModalContent = Basemodalcontentcomponent.BaseModalContent;
import Datashareservice = require("../../../services/helpers/shareservice");
import ShareService = Datashareservice.ShareService;
import Userclasses = require("../../../models/userclasses");
import Userdataservice = require("../../../services/userdataservice");
import UserDataService = Userdataservice.UserDataService;
import UserTemplate = Userclasses.UserTemplate;
import { MaterializeModule } from 'angular2-materialize';
import { MarketDataService } from "../../../services/marketdataservice";

declare var $: any;
@Component({
    selector: 'edituser',
    template: require('./edituser.component.html'),
    styles: [require('./edituser.component.css')]
})
export class EditUser extends BaseModalContent implements OnInit, AfterViewInit, IModalContent {

    title: string;
    model: UserTemplate;
    roles: {id: number, name:string}[] = [];
    public form: FormGroup;

    public regions : string[] = [ 'Region 1', 'Region 2' , 'Region 3'];
    public zones: string[] =['Zone 1', 'Zone 2', 'Zone 3'];
    public dealerships: string[] = ['Dealership 1', 'Dealership 2', 'Dealership 3'];

    constructor(private injector: Injector, private userDataService: UserDataService,
        private fb: FormBuilder, public marketDataService: MarketDataService) {
        super();
        if (injector) {
            this.model = injector.get('model');
        }
        this.initialiseForm();
        this.getAutoCompleteData();
    } 

    ngOnInit() {
        $(document).ready(() => {
            $('edituser select').material_select();
        });
    }

    ngAfterViewInit() {
    }

    initialiseForm() {
        this.form = this.fb.group({
            id: new FormControl(this.model.id, []),
            firstName: new FormControl(this.model.firstName, [<any>Validators.required]),
            lastName: new FormControl(this.model.lastName, [<any>Validators.required]),
            email: new FormControl(this.model.email, [<any>Validators.required]),
            dealershipName: new FormControl(this.model.dealershipName, [<any>Validators.required]),
            dealershipCode: new FormControl(this.model.dealershipCode, [<any>Validators.required]),
            regionName: new FormControl(this.model.regionName, [<any>Validators.required]),
            areaName: new FormControl(this.model.areaName, [<any>Validators.required]),
            secGroup: new FormControl(this.model.secGroup, [<any>Validators.required])
        });
    }

    getAutoCompleteData() {
        this.marketDataService.getMarketUserFilters().subscribe((result) => {
            if (result) {
                this.dealerships = result.dealershipNames;
                this.zones = result.areas;
                this.regions = result.regions;
            }
        });
        this.userDataService.getUserGroups().subscribe((result) => {
            if (result) {
                result.forEach((role) => {
                    this.roles.push({ id: role.id, name: role.name });
                });
            }
        });
    }

    saveUser(user: UserTemplate, isValid: boolean) {
        if (!isValid)
            return;

        this.userDataService.updateUser(user).subscribe((response) => {
            if (response.success) {
                this.closeModal(user);
            }
        });
    }

}
