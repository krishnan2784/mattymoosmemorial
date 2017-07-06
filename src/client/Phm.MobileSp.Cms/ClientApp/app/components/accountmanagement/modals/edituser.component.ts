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
import UserAccount = Userclasses.UserAccount;
import { MaterializeModule } from 'angular2-materialize';

declare var $: any;
@Component({
    selector: 'edituser',
    template: require('./edituser.component.html'),
    styles: [require('./edituser.component.css')]
})
export class EditUser extends BaseModalContent implements OnInit, AfterViewInit, IModalContent {

    title: string;
    model: UserAccount;
    roles: {id: number, name:string}[] = [{ id: 1, name: 'Sales Manager' }, { id: 2, name: 'Sales Executive' }];
    public form: FormGroup;

    public regions : string[] = [ 'Region 1', 'Region 2' , 'Region 3'];
    public zones: string[] =['Zone 1', 'Zone 2', 'Zone 3'];
    public dealerships: string[] = ['Dealership 1', 'Dealership 2', 'Dealership 3'];

    constructor(private injector: Injector, private userDataService: UserDataService, private fb: FormBuilder) {
        super();
        if (injector) {
            this.model = injector.get('model');
        }
        this.initialiseForm();
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
            dealershipCode: new FormControl(this.model.dealershipCode, [<any>Validators.required]),
            region: new FormControl(this.model.region, [<any>Validators.required]),
            zone: new FormControl(this.model.zone, [<any>Validators.required]),
            role: new FormControl(this.model.role, [<any>Validators.required])
        });
    }

    saveUser(user: UserAccount, isValid: boolean) {
        console.log(user);
        //this.closeModal(user);

        //if (!isValid)
        //    return;

        //this.userDataService.updateUser(user).subscribe((response) => {
        //    if (response.success) {
        //        Materialize.toast(response.message, 5000, 'green');
        //        this.closeModal(user);
        //    } else {
        //        Materialize.toast(response.message, 5000, 'red');
        //    }
        //});
    }

}
