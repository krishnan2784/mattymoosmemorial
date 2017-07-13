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
var QuizUserResultsComponent = (function () {
    function QuizUserResultsComponent() {
        this.data = [];
    }
    QuizUserResultsComponent.prototype.ngOnInit = function () {
        this.formatDataSet();
    };
    QuizUserResultsComponent.prototype.formatDataSet = function () {
        var q = this.quiz.questions;
        for (var i = 0; i < q.length; i++) {
            var a = {
                question: q[i].question,
                options: [],
                isCorrect: true
            };
            for (var j = 0; j < q[i].answers.length; j++) {
                var isChecked = this.getAnswerFromUser(q[i].id, q[i].answers[j].id);
                a.options.push({
                    answer: q[i].answers[j].answer,
                    isCorrect: q[i].answers[j].isCorrect,
                    isChecked: isChecked
                });
                if (q[i].answers[j].isCorrect && !isChecked) {
                    a.isCorrect = false;
                }
            }
            this.data.push(a);
        }
    };
    QuizUserResultsComponent.prototype.getAnswerFromUser = function (questionId, answerId) {
        var q = this.results.quizFeedResults;
        for (var i = 0; i < q.length; i++) {
            if (q[i].quizQuestionId == questionId && q[i].quizAnswerId == answerId) {
                return q[i].isSelected;
            }
        }
    };
    return QuizUserResultsComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], QuizUserResultsComponent.prototype, "quiz", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], QuizUserResultsComponent.prototype, "results", void 0);
QuizUserResultsComponent = __decorate([
    core_1.Component({
        selector: 'quizuserresults',
        template: require('./quizuserresults.html'),
        styles: [require('./quizuserresults.css')],
    })
], QuizUserResultsComponent);
exports.QuizUserResultsComponent = QuizUserResultsComponent;
//# sourceMappingURL=quizuserresults.component.js.map