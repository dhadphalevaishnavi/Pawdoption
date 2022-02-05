import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/Classes/question/question';
import { QuestionService } from 'src/app/Services/question/question.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';

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

    if (this.question.caregiver == null || this.question.city == null || this.question.dayStaying == null ||
      this.question.isAlargic == null || this.question.nightStaying == null || this.question.noOfPetsOwnedBefore == null ||
      this.question.petIsFor == null || this.question.vetDistance == null) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Please fill All details.',
        showConfirmButton: false,
        timer: 1500
      })
    }

    else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })

      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You want to edit profile...",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, edit!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        
        if (result.isConfirmed) {
        //check if questions already answered
        this.questionService.checkAnswersExists(this.question).subscribe(
          data => {

            //if already exists then edit 

            if (data == true) {
              this.questionService.editAnswers(this.question).subscribe(
                data1 => {

                  if (result.isConfirmed) {
                    swalWithBootstrapButtons.fire(
                      'Edited!',
                      'Your profile has been edited.',
                      'success'
                    )

                    this.setComponentToshow('');
                  }
                },
                error1 => { console.log("can not edit new answers"); }

              );
            }

            if (data == false) {
              // else add new answers
              this.questionService.addAnswers(this.question).subscribe(
                data1 => {
                  console.log("added new answers");

                  this.setComponentToshow('');
                },
                error1 => { console.log("can not add new answers"); }
              );
            }


          },

          error => {

            console.log("Something went wrong while editing/adding profile");

          });

        }

        else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your Profile is not edited :)',
            'error'
          )
        }
      })
    }
  }

  //check if questions already answered
  // this.questionService.checkAnswersExists(this.question).subscribe(
  //   data => {

  //     //if already exists then edit 

  //     if (data == true) {
  //       this.questionService.editAnswers(this.question).subscribe(
  //         data1 => {

  //           if (result.isConfirmed) {
  //             swalWithBootstrapButtons.fire(
  //               'Deleted!',
  //               'Your profile has been edited.',
  //               'success'
  //             )

  //           this.setComponentToshow('')
  //         },
  //         error1 => { console.log("can not edit new answers"); }

  //       );
  //     }

  //     if (data == false) {
  //       // else add new answers
  //       this.questionService.addAnswers(this.question).subscribe(
  //         data1 => {
  //           console.log("added new answers");

  //           this.setComponentToshow('')
  //         },
  //         error1 => { console.log("can not add new answers"); }
  //       );
  //     }
  //   },

  //   error => {

  //     console.log("Something went wrong while editing/adding profile");

  //   }
  // );

  // }

  setComponentToshow(componentName: string) {

    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }
}
