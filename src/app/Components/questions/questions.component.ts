import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/Classes/question/question';
import { QuestionService } from 'src/app/Services/question/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  question = new Question();

  constructor(private questionService : QuestionService) { }

  ngOnInit(): void {
  }


  noteAnswers()
  {
   //check if questions already answered
    this.questionService.checkAnswersExists(this.question).subscribe(
      data=>{
            //if already exists then edit 
            this.questionService.editAnswers(this.question).subscribe(
              data1=>{console.log("edited new answers");},
              error1=>{console.log("can not edit new answers");}

            );
       
      },

      error=>{

           // else add new answers
           this.questionService.addAnswers(this.question).subscribe(
            data1=>{console.log("added new answers");},
            error1=>{console.log("can not add new answers");}
           );
      }
    );

  }

}
