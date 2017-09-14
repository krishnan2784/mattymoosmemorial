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
import { MarketDataService } from "../../../services/marketdataservice";
import Form = require("../../../classes/helpers/form");
import FormEx = Form.FormEx;
import Validators1 = require("../../../classes/validators");

declare var Materialize: any;
declare var $: any;
@Component({
    selector: 'edituser',
    template: require('./edituser.component.html'),
    styles: [require('./edituser.component.css')]
})
export class EditUser extends BaseModalContent implements OnInit, AfterViewInit, IModalContent {

    title: string;
    model: UserTemplate;
    roles: {id: number, name:string}[];
    public form: FormGroup;

    public regions : string[] = [ 'Region 1', 'Region 2' , 'Region 3'];
    public zones: string[] =['Zone 1', 'Zone 2', 'Zone 3'];
    public dealershipNames: string[] = ['Dealership 1', 'Dealership 2', 'Dealership 3'];
    public dealershipCodes: string[] = ['0001', '0002', '0003'];
    submitted: boolean = false;
    loading: boolean = false;

    constructor(private injector: Injector, private userDataService: UserDataService,
        private fb: FormBuilder, public marketDataService: MarketDataService) {
        super();
        if (injector) {
            this.model = injector.get('model');
            this.roles = injector.get('roles');
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
            email: new FormControl(this.model.email, [<any>Validators.required, Validators1.validEmailAddress()]),
            dealershipName: new FormControl(this.model.dealershipName, [<any>Validators.required]),
            dealershipCode: new FormControl(this.model.dealershipCode, [<any>Validators.required]),
            regionName: new FormControl(this.model.regionName, [<any>Validators.required]),
            zoneName: new FormControl(this.model.zoneName, [<any>Validators.required]),
            secGroup: new FormControl(this.model.secGroup, [<any>Validators.required, Validators1.validUserRole()])
        });
        if (this.roles && this.roles.length > 0 && this.model && this.model.secGroup && this.model.secGroup.id > 0)
            this.model.secGroup = this.roles.find(x => x.id == this.model.secGroup.id);
    }

    getAutoCompleteData() {
        this.marketDataService.getMarketUserFilters().subscribe((result) => {
            if (result) {
                this.dealershipNames = result.dealershipNames;
                this.dealershipCodes = result.dealershipCodes;
                this.zones = result.zones;
                this.regions = result.regions;
            }
        });
    }

    saveUser(user: UserTemplate, isValid: boolean) {
        this.submitted = true;
        if (!isValid) {
            console.log(FormEx.getFormValidationErrors(this.form));
            $('.toast').remove();
            return Materialize.toast('Please check that you have filled in all the required fields.', 6000, 'red');
        }
        if (this.loading)
            return;

        this.loading = true;
        this.userDataService.updateUser(user).subscribe((response) => {
            if (response.success) {
                this.closeModal(response.content);
            }
            this.submitted = false;
            this.loading = false;
        });
    }

}
