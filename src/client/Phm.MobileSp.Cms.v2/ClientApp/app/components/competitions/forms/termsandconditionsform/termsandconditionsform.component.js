"use strict";
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
var competitionclasses_1 = require("../../../../models/competitionclasses");
var form_1 = require("../../../../classes/helpers/form");
var shareservice_1 = require("../../../../services/helpers/shareservice");
var termsandconditionsdataservice_1 = require("../../../../services/termsandconditionsdataservice");
var TermsAndConditionForm = (function () {
    function TermsAndConditionForm(_fb, sharedService, termsAndConditionsDataService) {
        this._fb = _fb;
        this.sharedService = sharedService;
        this.termsAndConditionsDataService = termsAndConditionsDataService;
        this.termsAndConditionsUpdated = new core_1.EventEmitter();
        this.submitted = false;
        this.loading = false;
    }
    TermsAndConditionForm.prototype.ngOnInit = function () {
        this.setupSteps();
        this.getData();
        this.initialiseForm();
    };
    TermsAndConditionForm.prototype.getData = function () {
        this.model = new competitionclasses_1.TermsAndCondition(this.model);
    };
    TermsAndConditionForm.prototype.initialiseForm = function () {
        this.form = this._fb.group({
            id: [this.model.id, []],
            published: [this.model.published, []],
            title: [this.model.title, [forms_1.Validators.required, forms_1.Validators.maxLength(160)]],
            fullDescription: [this.model.fullDescription, [forms_1.Validators.required]]
        });
    };
    TermsAndConditionForm.prototype.setupSteps = function () {
        this.navbarData = [{ id: 'description', text: 'Description' }];
        this.currentStep = 'description';
    };
    TermsAndConditionForm.prototype.updateCurrentStep = function (step) {
        this.currentStep = step;
    };
    TermsAndConditionForm.prototype.save = function (termsAndConditions, isValid) {
        var _this = this;
        this.submitted = true;
        if (!this.form.valid) {
            console.log(form_1.FormEx.getFormValidationErrors(this.form));
            $('.toast').remove();
            return Materialize.toast('Please check that you have filled in all the required fields.', 6000, 'red');
        }
        this.loading = true;
        this.termsAndConditionsDataService.updateTermsAndCondition(termsAndConditions).subscribe(function (result) {
            if (result.success) {
                _this.termsAndConditionsUpdated.emit(result.content);
            }
            else
                _this.loading = false;
        });
    };
    TermsAndConditionForm.prototype.goBack = function () {
        this.termsAndConditionsUpdated.emit(null);
    };
    return TermsAndConditionForm;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], TermsAndConditionForm.prototype, "termsAndConditionsUpdated", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", competitionclasses_1.TermsAndCondition)
], TermsAndConditionForm.prototype, "model", void 0);
TermsAndConditionForm = __decorate([
    core_1.Component({
        selector: 'terms-and-conditions-form',
        template: require('./termsandconditionsform.component.html'),
        styles: [require('./termsandconditionsform.component.css')]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, shareservice_1.ShareService,
        termsandconditionsdataservice_1.TermsAndConditionsDataService])
], TermsAndConditionForm);
exports.TermsAndConditionForm = TermsAndConditionForm;
//# sourceMappingURL=termsandconditionsform.component.js.map