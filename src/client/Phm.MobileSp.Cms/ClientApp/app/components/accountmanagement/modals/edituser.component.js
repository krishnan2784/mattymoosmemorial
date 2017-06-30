"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Basemodalcontentcomponent = require("../../modals/basemodalcontent.component");
var BaseModalContent = Basemodalcontentcomponent.BaseModalContent;
var Userdataservice = require("../../../services/userdataservice");
var UserDataService = Userdataservice.UserDataService;
var EditUser = (function (_super) {
    __extends(EditUser, _super);
    function EditUser(injector, userDataService, fb) {
        var _this = _super.call(this) || this;
        _this.injector = injector;
        _this.userDataService = userDataService;
        _this.fb = fb;
        _this.roles = [{ id: 1, name: 'Sales Manager' }, { id: 2, name: 'Sales Executive' }];
        _this.regions = ['Region 1', 'Region 2', 'Region 3'];
        _this.zones = ['Zone 1', 'Zone 2', 'Zone 3'];
        _this.dealerships = ['Dealership 1', 'Dealership 2', 'Dealership 3'];
        if (injector) {
            _this.model = injector.get('model');
        }
        _this.initialiseForm();
        return _this;
    }
    EditUser.prototype.ngOnInit = function () {
        $(document).ready(function () {
            $('edituser select').material_select();
        });
    };
    EditUser.prototype.ngAfterViewInit = function () {
    };
    EditUser.prototype.initialiseForm = function () {
        this.form = this.fb.group({
            id: new forms_1.FormControl(this.model.id, []),
            firstName: new forms_1.FormControl(this.model.firstName, [forms_1.Validators.required]),
            lastName: new forms_1.FormControl(this.model.lastName, [forms_1.Validators.required]),
            email: new forms_1.FormControl(this.model.email, [forms_1.Validators.required]),
            dealershipCode: new forms_1.FormControl(this.model.dealershipCode, [forms_1.Validators.required]),
            region: new forms_1.FormControl(this.model.region, [forms_1.Validators.required]),
            zone: new forms_1.FormControl(this.model.zone, [forms_1.Validators.required]),
            role: new forms_1.FormControl(this.model.role, [forms_1.Validators.required])
        });
    };
    EditUser.prototype.saveUser = function (user, isValid) {
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
    };
    return EditUser;
}(BaseModalContent));
EditUser = __decorate([
    core_1.Component({
        selector: 'edituser',
        template: require('./edituser.component.html'),
        styles: [require('./edituser.component.css')]
    }),
    __metadata("design:paramtypes", [core_1.Injector, UserDataService, forms_1.FormBuilder])
], EditUser);
exports.EditUser = EditUser;
//# sourceMappingURL=edituser.component.js.map