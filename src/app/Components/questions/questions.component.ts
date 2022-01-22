import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/Classes/question/question';
import { QuestionService } from 'src/app/Services/question/question.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  question = new Question();

  constructor(private questionService: QuestionService, private changeComponentService: ChangeComponentService, private router: Router) { }

  ngOnInit(): void {
  }


  noteAnswers() {

    //check if questions already answered
    this.questionService.checkAnswersExists(this.question).subscribe(
      data => {

        //if already exists then edit 

        if (data == true) {
          this.questionService.editAnswers(this.question).subscribe(
            data1 => {
              console.log("edited new answers");

              this.setComponentToshow('')
            },
            error1 => { console.log("can not edit new answers"); }

          );
        }

        if (data == false) {
          // else add new answers
          this.questionService.addAnswers(this.question).subscribe(
            data1 => {
              console.log("added new answers");

              this.setComponentToshow('')
            },
            error1 => { console.log("can not add new answers"); }
          );
        }
      },

      error => {

        console.log("Something went wrong while editing/adding profile");
        // // else add new answers
        // this.questionService.addAnswers(this.question).subscribe(
        //   data1 => {
        //     console.log("added new answers");

        //     this.setComponentToshow('')
        //   },
        //   error1 => { console.log("can not add new answers"); }
        // );
      }
    );

  }

  setComponentToshow(componentName: string) {

    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }
}
