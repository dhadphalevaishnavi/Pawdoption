import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/Classes/login/user-login';
import { RegistrationClass } from 'src/app/Classes/registration/registration-class';
import { LoginDataService } from 'src/app/Services/login/login-data.service';
import { RegistrationService } from 'src/app/Services/registration/registration.service';

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
    if(this.password1 == this.password2)
    {
      sessionStorage.setItem("resetPassword","false");
      //Reset password in database
      this.loginDataService.setPassword(this.password2);
      this.registrationService.resetPassword(this.loginDataService).subscribe(

        data=>{
          console.log("Passowrd Reset Successfully");
          this.router.navigate(['/Login']);
        },
        error=>{
          console.log("Password not reset");
        }
      );
       
    }

    else{
      console.log("Password not matched")
    }

  }

}
