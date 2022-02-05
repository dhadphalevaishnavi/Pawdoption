import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/Classes/login/user-login';
import { RegistrationClass } from 'src/app/Classes/registration/registration-class';
import { LoginDataService } from 'src/app/Services/login/login-data.service';
import { RegistrationService } from 'src/app/Services/registration/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  password1:string;
  password2:string;

  constructor(private loginDataService:LoginDataService , private registrationService:RegistrationService , private router:Router) { }

  ngOnInit(): void {
  }

  resetPassword()
  {
  
    if(this.password1==null || this.password2==null )
    {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: "Password can not be null",
        showConfirmButton: false,
        timer: 1500
      })
    }
    else if( this.password1 == this.password2)
    {
      // sessionStorage.setItem("resetPassword","false");
     

      //Reset password in database
      this.loginDataService.setPassword(this.password2);
      this.registrationService.resetPassword(this.loginDataService).subscribe(

        data=>{

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: "Password changed successfully!",
            showConfirmButton: false,
            timer: 1500
          }).then((result=>{
          
            this.router.navigate(['/Login']);
          }))
         
        },
        error=>{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "Something went wrong",
            showConfirmButton: false,
            timer: 1500
          })
          
        }
      );
       
    }

    else{
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: "Password not matched",
        showConfirmButton: false,
        timer: 1500
      })
  
    }

  }

}
