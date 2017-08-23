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
var marketdataservice_1 = require("../../../services/marketdataservice");
var EditUser = (function (_super) {
    __extends(EditUser, _super);
    function EditUser(injector, userDataService, fb, marketDataService) {
        var _this = _super.call(this) || this;
        _this.injector = injector;
        _this.userDataService = userDataService;
        _this.fb = fb;
        _this.marketDataService = marketDataService;
        _this.regions = ['Region 1', 'Region 2', 'Region 3'];
        _this.zones = ['Zone 1', 'Zone 2', 'Zone 3'];
        _this.dealershipNames = ['Dealership 1', 'Dealership 2', 'Dealership 3'];
        _this.dealershipCodes = ['0001', '0002', '0003'];
        if (injector) {
            _this.model = injector.get('model');
        }
        _this.initialiseForm();
        _this.getAutoCompleteData();
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
            dealershipName: new forms_1.FormControl(this.model.dealershipName, [forms_1.Validators.required]),
            dealershipCode: new forms_1.FormControl(this.model.dealershipCode, [forms_1.Validators.required]),
            regionName: new forms_1.FormControl(this.model.regionName, [forms_1.Validators.required]),
            areaName: new forms_1.FormControl(this.model.areaName, [forms_1.Validators.required]),
            secGroup: new forms_1.FormControl(this.model.secGroup, [forms_1.Validators.required])
        });
    };
    EditUser.prototype.getAutoCompleteData = function () {
        var _this = this;
        this.marketDataService.getMarketUserFilters().subscribe(function (result) {
            if (result) {
                _this.dealershipNames = result.dealershipNames;
                _this.dealershipCodes = result.dealershipCodes;
                _this.zones = result.zones;
                _this.regions = result.regions;
            }
        });
        this.userDataService.getUserGroups().subscribe(function (result) {
            if (result) {
                _this.roles = [];
                result.forEach(function (role) {
                    _this.roles.push({ id: role.id, name: role.name });
                });
                if (_this.roles && _this.roles.length > 0 && _this.model && _this.model.secGroup && _this.model.secGroup.id > 0)
                    _this.model.secGroup = _this.roles.find(function (x) { return x.id == _this.model.secGroup.id; });
            }
        });
    };
    EditUser.prototype.saveUser = function (user, isValid) {
        var _this = this;
        if (!isValid)
            return;
        this.userDataService.updateUser(user).subscribe(function (response) {
            if (response.success) {
                _this.closeModal(response.content);
            }
        });
    };
    return EditUser;
}(BaseModalContent));
EditUser = __decorate([
    core_1.Component({
        selector: 'edituser',
        template: require('./edituser.component.html'),
        styles: [require('./edituser.component.css')]
    }),
    __metadata("design:paramtypes", [core_1.Injector, UserDataService,
        forms_1.FormBuilder, marketdataservice_1.MarketDataService])
], EditUser);
exports.EditUser = EditUser;
//# sourceMappingURL=edituser.component.js.map