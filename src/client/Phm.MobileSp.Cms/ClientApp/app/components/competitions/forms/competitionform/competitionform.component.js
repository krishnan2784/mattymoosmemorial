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
var CompetitionForm = (function () {
    function CompetitionForm(_fb) {
        this._fb = _fb;
        this.competitionUpdated = new core_1.EventEmitter();
        this.loading = false;
    }
    CompetitionForm.prototype.ngOnInit = function () {
        this.setupSteps();
        this.initialiseForm();
    };
    CompetitionForm.prototype.initialiseForm = function () {
        this.form = this._fb.group({
            id: [this.model.id, []],
            title: [this.model.title, [forms_1.Validators.required, forms_1.Validators.maxLength(160)]]
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
    CompetitionForm.prototype.save = function (competition, isValid) {
        this.loading = true;
        console.log(competition);
        this.loading = false;
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
    __metadata("design:type", Object)
], CompetitionForm.prototype, "model", void 0);
CompetitionForm = __decorate([
    core_1.Component({
        selector: 'competition-form',
        template: require('./competitionform.component.html'),
        styles: [require('./competitionform.component.css')]
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder])
], CompetitionForm);
exports.CompetitionForm = CompetitionForm;
//# sourceMappingURL=competitionform.component.js.map