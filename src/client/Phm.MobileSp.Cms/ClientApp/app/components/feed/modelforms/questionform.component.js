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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Enums = require("../../../enums");
var FeedTypeEnum = Enums.FeedTypeEnum;
var quizclasses_1 = require("../../../models/quizclasses");
var quizclasses_2 = require("../../../models/quizclasses");
var surveyclasses_1 = require("../../../models/surveyclasses");
var surveyclasses_2 = require("../../../models/surveyclasses");
var QuestionFormComponent = (function () {
    function QuestionFormComponent() {
        if (!this.model || this.model.id === 0) {
            switch (this.feedType) {
                case Enums.FeedTypeEnum.Quiz:
                    this.model = new quizclasses_1.QuizQuestion({
                        'Order': this.index,
                        'Answers': {
                            0: new quizclasses_2.QuizQuestionAnswer({ 'Order': 0 }),
                            1: new quizclasses_2.QuizQuestionAnswer({ 'Order': 1 })
                        }
                    });
                case Enums.FeedTypeEnum.Survey:
                    this.model = new surveyclasses_1.SurveyQuestion({
                        'Order': this.index,
                        'Answers': {
                            0: new surveyclasses_2.SurveyQuestionAnswer({ 'Order': 0 }),
                            1: new surveyclasses_2.SurveyQuestionAnswer({ 'Order': 1 })
                        }
                    });
            }
        }
    }
    return QuestionFormComponent;
}());
__decorate([
    core_1.Input('feedType'),
    __metadata("design:type", Number)
], QuestionFormComponent.prototype, "feedType", void 0);
__decorate([
    core_1.Input('form'),
    __metadata("design:type", forms_1.FormGroup)
], QuestionFormComponent.prototype, "form", void 0);
__decorate([
    core_1.Input('model'),
    __metadata("design:type", Object)
], QuestionFormComponent.prototype, "model", void 0);
__decorate([
    core_1.Input('index'),
    __metadata("design:type", Number)
], QuestionFormComponent.prototype, "index", void 0);
QuestionFormComponent = __decorate([
    core_1.Component({
        selector: 'question',
        template: require('./questionform.component.html'),
        styles: [require('./questionform.component.css')]
    }),
    __metadata("design:paramtypes", [])
], QuestionFormComponent);
exports.QuestionFormComponent = QuestionFormComponent;
//# sourceMappingURL=questionform.component.js.map