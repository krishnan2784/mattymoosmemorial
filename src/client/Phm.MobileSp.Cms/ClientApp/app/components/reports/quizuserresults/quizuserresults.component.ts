import { Component, Input, OnInit } from '@angular/core';
import { ResponseHelper } from "../../../services/helpers/responsehelper";
@Component({
  selector: 'quizuserresults',
  template: require('./quizuserresults.html'),
  styles: [require('./quizuserresults.css')],
})
export class QuizUserResultsComponent implements OnInit {
  @Input() quiz: any;
  @Input() results: any;
  data = [];
  ngOnInit() {
	  this.formatDataSet();
  }
  formatDataSet() {
    let q = this.quiz.questions;
    for (let i = 0; i < q.length; i++) {
      let a = {
        question: q[i].question,
        options: [],
        isCorrect: q[i].answers.filter(x => x.isCorrect).length > 0
      };
      for (let j = 0; j < q[i].answers.length; j++) {
        let isChecked =  this.getAnswerFromUser(q[i].id, q[i].answers[j].id);
        a.options.push ({
          answer: q[i].answers[j].answer,
          isCorrect: q[i].answers[j].isCorrect,
          isChecked : isChecked
        });
        if (q[i].answers[j].isCorrect && !isChecked) {
          a.isCorrect = false;
        }
      }
      this.data.push(a);
    }
  }
  getAnswerFromUser(questionId, answerId) {
    let q = this.results.quizFeedResults;
    for (let i = 0 ; i < q.length ; i++){
      if (q[i].quizQuestionId == questionId && q[i].quizAnswerId == answerId ) {
        return q[i].isSelected
      }
    }
  }
}
