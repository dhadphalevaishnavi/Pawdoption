import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/Classes/login/user-login';
import { LoginService } from 'src/app/Services/login/login.service';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/registration/registration.service';
import { RegistrationClass } from 'src/app/Classes/registration/registration-class';
import { PassRegistrationDataService } from 'src/app/Services/registration/pass-registration-data.service';
import { LoginDataService } from 'src/app/Services/login/login-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginClassObject = new UserLogin();
  registrationData =new RegistrationClass();

  public activateSpinner:boolean;

  constructor(private loginDataService:LoginDataService,private loginService:LoginService , private router: Router , private registrationService:RegistrationService ,  private passData:PassRegistrationDataService ) { }

  ngOnInit(): void {
    this.activateSpinner=false;
  }


  loginForm()
  {
    this.activateSpinner=true;
    this.loginService.loginUser(this.userLoginClassObject).subscribe(
      data=>{

        // Store User data in sessionStorage
         
         sessionStorage.setItem("loggedUsername" , data.username);
         sessionStorage.setItem("loggedUserEmail" , data.email);
         sessionStorage.setItem("loggedUserId" , data.userId);

         location.replace("/");
         this.activateSpinner=false;
         //Go To HomePage
         this.router.navigate(['']);
      }, 
      error=>{
        console.log("Bad Credential");
        this.activateSpinner=false;
    }
      
    );
    
  }


  forgotPassword()
  {

    this.activateSpinner=true;
    if(this.userLoginClassObject.email != null)
    { 
      
      sessionStorage.setItem("forgotPassword" , "true");
      
      this.registrationService.sendOTP(this.registrationData).subscribe(
        data=>{
         
        
          this.passData.setOtp(data);
          this.loginDataService.setEmail(this.userLoginClassObject.email);
          this.activateSpinner=false;
          this.router.navigate(['verifyOtp']);
        },
        error=>{
          console.log("Something went wrong");
          this.activateSpinner=false;
        }
  
       );
      //this.router.navigate(['/verifyOtp']);
    }

    else{
      console.log("enter email first");
    }
   
  }




}
