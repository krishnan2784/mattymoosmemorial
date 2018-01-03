import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms'
import {UserTemplate} from "../../../../models/userclasses";
import {UserDataService} from "../../../../shared/services/userdataservice";
import {MarketDataService} from "../../../../shared/services/marketdataservice";
import {FormEx} from "../../../../classes/helpers/form";
import {validEmailAddress, validUserRole } from "../../../../classes/validators";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {AlertService} from "../../../../shared/services/helpers/alertservice";

declare var $: any;
@Component({
    selector: 'edituser',
    template: require('./edituser.component.html'),
    styles: [require('./edituser.component.css')]
})
export class EditUser {

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

    constructor(@Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<EditUser>, private userDataService: UserDataService,
      private fb: FormBuilder, public marketDataService: MarketDataService,
      public alertService: AlertService) {
        this.model = data.model;
        this.roles = data.roles;
        this.title = data.title;
        this.initialiseForm();
        this.getAutoCompleteData();
    } 
  
    initialiseForm() {
        this.form = this.fb.group({
            id: new FormControl(this.model.id, []),
            firstName: new FormControl(this.model.firstName, [<any>Validators.required]),
            lastName: new FormControl(this.model.lastName, [<any>Validators.required]),
            email: new FormControl(this.model.email, [<any>Validators.required, validEmailAddress()]),
            dealershipName: new FormControl(this.model.dealershipName, [<any>Validators.required]),
            dealershipCode: new FormControl(this.model.dealershipCode, [<any>Validators.required]),
            regionName: new FormControl(this.model.regionName, [<any>Validators.required]),
            zoneName: new FormControl(this.model.zoneName, [<any>Validators.required]),
            secGroup: new FormControl(this.model.secGroup, [<any>Validators.required, validUserRole()])
        });
        if (this.roles && this.roles.length > 0 && this.model && this.model.secGroup && this.model.secGroup.id > 0)
            this.model.secGroup = this.roles.find(x => x.id == this.model.secGroup.id);
    }

    getAutoCompleteData() {
      this.marketDataService.getMarketUserFilters().subscribe((result) => {
        console.log(result);

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
            return this.alertService.displaySuccessFailAlert('Please check that you have filled in all the required fields.', false);
        }
        if (this.loading)
            return;

        this.loading = true;
        this.userDataService.updateUser(user).subscribe((response) => {
          if (response.success) {
            this.dialogRef.close(response.content);
          }
          this.submitted = false;
          this.loading = false;
        });
    }

}
