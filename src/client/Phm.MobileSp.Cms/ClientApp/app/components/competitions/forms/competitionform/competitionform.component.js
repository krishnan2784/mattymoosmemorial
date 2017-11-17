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
var competitionsdataservice_1 = require("../../../../services/competitionsdataservice");
var form_1 = require("../../../../classes/helpers/form");
var shareservice_1 = require("../../../../services/helpers/shareservice");
var enums_1 = require("../../../../enums");
var CompetitionForm = (function () {
    function CompetitionForm(_fb, sharedService, competitionService) {
        this._fb = _fb;
        this.sharedService = sharedService;
        this.competitionService = competitionService;
        this.competitionUpdated = new core_1.EventEmitter();
        this.loading = false;
        this.uploaderTypes = enums_1.UploaderType;
    }
    CompetitionForm.prototype.ngOnInit = function () {
        this.setupSteps();
        this.initialiseForm();
    };
    CompetitionForm.prototype.initialiseForm = function () {
        this.form = this._fb.group({
            id: [this.model.id, []],
            title: [this.model.title, [forms_1.Validators.required, forms_1.Validators.maxLength(160)]],
            about: [this.model.about, [forms_1.Validators.required]],
            mainImageId: [this.model.mainImageId, []],
            makeImageLink: [this.model.makeImageLink, []],
            linkUrl: [this.model.linkUrl, []],
            linkTitle: [this.model.linkTitle, []],
            baseRewardSchemeId: [this.model.baseRewardSchemeId, []],
            termsAndConditionId: [this.model.termsAndConditionId, []],
            startDate: [this.model.startDate, []],
            endDate: [this.model.endDate, []],
            activeImageId: [this.model.activeImageId, []],
            makeActiveImageLink: [this.model.makeActiveImageLink, []],
            completedImageId: [this.model.completedImageId, []],
            makeCompletedImageLink: [this.model.makeCompletedImageLink, []]
        });
    };
    CompetitionForm.prototype.setupSteps = function () {
        this.navbarData = [{ id: 'description', text: 'Description' },
            { id: 'settings', text: 'Settings' }];
        this.currentStep = 'description';
    };
    CompetitionForm.prototype.updateCurrentStep = function (step) {
        this.currentStep = step;
    };
    CompetitionForm.prototype.checkbox = function () {
        console.log('hi', this.form.controls.makeImageLink);
        this.form.controls.makeImageLink.patchValue(true, { onlySelf: true });
    };
    CompetitionForm.prototype.save = function (competition, isValid) {
        var _this = this;
        if (!this.form.valid) {
            console.log(form_1.FormEx.getFormValidationErrors(this.form));
            $('.toast').remove();
            return Materialize.toast('Please check that you have filled in all the required fields.', 6000, 'red');
        }
        this.loading = true;
        this.competitionService.updateCompetition(competition).subscribe(function (result) {
            if (result.success) {
                _this.model = result.content;
                _this.sharedService.updateFeedItem(result.content);
                _this.competitionUpdated.emit(result.content);
            }
            else
                _this.loading = false;
        });
    };
    CompetitionForm.prototype.goBack = function () {
        this.competitionUpdated.emit(null);
    };
    return CompetitionForm;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], CompetitionForm.prototype, "competitionUpdated", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", competitionclasses_1.Competition)
], CompetitionForm.prototype, "model", void 0);
CompetitionForm = __decorate([
    core_1.Component({
        selector: 'competition-form',
        template: require('./competitionform.component.html'),
        styles: [require('./competitionform.component.css')]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, shareservice_1.ShareService, competitionsdataservice_1.CompetitionsDataService])
], CompetitionForm);
exports.CompetitionForm = CompetitionForm;
//# sourceMappingURL=competitionform.component.js.map