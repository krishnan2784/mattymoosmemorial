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
var rewardschemedataservice_1 = require("../../../../services/rewardschemedataservice");
var RewardSchemeForm = (function () {
    function RewardSchemeForm(_fb, sharedService, rewardSchemesDataService) {
        this._fb = _fb;
        this.sharedService = sharedService;
        this.rewardSchemesDataService = rewardSchemesDataService;
        this.rewardSchemeUpdated = new core_1.EventEmitter();
        this.submitted = false;
        this.loading = false;
        this.rewardScheme = [];
        this.termsAndConditions = [];
    }
    RewardSchemeForm.prototype.ngOnInit = function () {
        console.log(this.model);
        this.setupSteps();
        this.getData();
        this.initialiseForm();
    };
    RewardSchemeForm.prototype.getData = function () {
        this.model = new competitionclasses_1.PositionXBoosterRewardScheme(this.model);
    };
    RewardSchemeForm.prototype.initialiseForm = function () {
        var _this = this;
        var formArray = new forms_1.FormArray([], forms_1.Validators.minLength(1));
        this.model.items.forEach(function (x) { return formArray.push(_this.initItem(x)); });
        this.form = this._fb.group({
            id: [this.model.id, []],
            title: [this.model.title, [forms_1.Validators.required, forms_1.Validators.maxLength(160)]],
            about: [this.model.about, []],
            items: formArray
        });
    };
    RewardSchemeForm.prototype.initItem = function (condition) {
        if (condition === void 0) { condition = new competitionclasses_1.PositionXBoosterItem(); }
        return new forms_1.FormGroup({
            id: new forms_1.FormControl(condition.id, []),
            positionXBoosterRewardSchemeId: new forms_1.FormControl(condition.positionXBoosterRewardSchemeId, []),
            startPosition: new forms_1.FormControl(condition.startPosition, [forms_1.Validators.required]),
            endPosition: new forms_1.FormControl(condition.endPosition, [forms_1.Validators.required]),
            xBooster: new forms_1.FormControl(condition.xBooster, [forms_1.Validators.required])
        });
    };
    RewardSchemeForm.prototype.setupSteps = function () {
        this.navbarData = [{ id: 'description', text: 'Description' }];
        this.currentStep = 'description';
    };
    RewardSchemeForm.prototype.updateCurrentStep = function (step) {
        this.currentStep = step;
    };
    RewardSchemeForm.prototype.addCondition = function () {
        var control = this.form.controls['items'];
        control.push(this.initItem());
    };
    RewardSchemeForm.prototype.removeCondition = function (index) {
        var control = this.form.controls['items'];
        control.removeAt(index);
        this.form.markAsDirty();
    };
    RewardSchemeForm.prototype.save = function (rewarScheme, isValid) {
        var _this = this;
        this.submitted = true;
        if (!this.form.valid) {
            console.log(form_1.FormEx.getFormValidationErrors(this.form));
            $('.toast').remove();
            return Materialize.toast('Please check that you have filled in all the required fields.', 6000, 'red');
        }
        this.loading = true;
        this.rewardSchemesDataService.updateRewardScheme(rewarScheme).subscribe(function (result) {
            if (result.success) {
                _this.rewardSchemeUpdated.emit(result.content);
            }
            else
                _this.loading = false;
        });
    };
    RewardSchemeForm.prototype.goBack = function () {
        this.rewardSchemeUpdated.emit(null);
    };
    return RewardSchemeForm;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RewardSchemeForm.prototype, "rewardSchemeUpdated", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", competitionclasses_1.PositionXBoosterRewardScheme)
], RewardSchemeForm.prototype, "model", void 0);
RewardSchemeForm = __decorate([
    core_1.Component({
        selector: 'reward-scheme-form',
        template: require('./rewardschemeform.component.html'),
        styles: [require('./rewardschemeform.component.css')],
        encapsulation: core_1.ViewEncapsulation.None
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, shareservice_1.ShareService,
        rewardschemedataservice_1.RewardSchemesDataService])
], RewardSchemeForm);
exports.RewardSchemeForm = RewardSchemeForm;
//# sourceMappingURL=rewardschemeform.component.js.map