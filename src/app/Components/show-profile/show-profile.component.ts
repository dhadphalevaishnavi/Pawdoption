import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from 'src/app/Classes/question/question';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import { QuestionService } from 'src/app/Services/question/question.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit {

  question=new Question;
  username:string | null;

  constructor(private router:Router , private changeComponentService:ChangeComponentService , private questionService:QuestionService ) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("loggedUsername");
    
    this.questionService.findUserProfile().subscribe(
      data=>{
        this.question = data;
      },
      error=>{
        console.log("Profile not found");
      }
    );

  } 


  setComponentToshow(componentName : string)
  {
    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }

}
