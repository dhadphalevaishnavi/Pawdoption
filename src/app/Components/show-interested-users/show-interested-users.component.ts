import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/Classes/question/question';
import { RegistrationClass } from 'src/app/Classes/registration/registration-class';
import { RegistrationService } from 'src/app/Services/registration/registration.service';
import { QuestionService } from 'src/app/Services/question/question.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-show-interested-users',
  templateUrl: './show-interested-users.component.html',
  styleUrls: ['./show-interested-users.component.css']
})
export class ShowInterestedUsersComponent implements OnInit {

  i = 0;
  user:Array<RegistrationClass>;
  userProfile:Question  ;
  showProfileModel:boolean = false;

  constructor(private registrationService:RegistrationService , private questionService:QuestionService, private changeComponentService:ChangeComponentService , private router:Router) { }

  ngOnInit(): void {

    this.registrationService.findInterestedUsers().subscribe(
      data=>{
        this.user = data;
       // sessionStorage.removeItem("petId");
      },
      error=>{
        console.log("Something went wrong");
      }
    );

  }

  showProfile( selectedUser : RegistrationClass )
  {
  
    this.showProfileModel = true;
    this.userProfile = new Question();

    this.questionService.searchUserProfile(selectedUser).subscribe(
      data=>{
        this.userProfile = data;
       
      },
      error=>{
        console.log("can not find user profile");
      }
    );
  }


  rejectOffer( selectedUser : RegistrationClass )
  {

    this.registrationService.rejectUserEnquery(selectedUser).subscribe(
      data=>{
       
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Adoption offer rejected successfully!!!',
          showConfirmButton: false,
          timer: 1500
        }).then((result)=> { 

          this.setComponentToshow('showInterestedUsers'); 
    
        });
        
    
      },
      error=>{
        console.log(error);
      }
    );


  }

  setComponentToshow(componentName : string)
  {
    
    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }

}
