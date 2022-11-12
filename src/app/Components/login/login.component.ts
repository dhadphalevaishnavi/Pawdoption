import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/Classes/login/user-login';
import { LoginService } from 'src/app/Services/login/login.service';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/registration/registration.service';
import { RegistrationClass } from 'src/app/Classes/registration/registration-class';
import { PassRegistrationDataService } from 'src/app/Services/registration/pass-registration-data.service';
import { LoginDataService } from 'src/app/Services/login/login-data.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginClassObject = new UserLogin();
  registrationData =new RegistrationClass();

  isUserBlocked:boolean;

  public activateSpinner:boolean;

  constructor(private loginDataService:LoginDataService,private loginService:LoginService , private router: Router , private registrationService:RegistrationService ,  private passData:PassRegistrationDataService ) { }

  ngOnInit(): void {
    this.activateSpinner=false;
  }


  loginForm()
  {
    this.activateSpinner=true;

    if(this.userLoginClassObject.email == null || this.userLoginClassObject.password == null)
    {
      this.activateSpinner=false;
      
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Please fill all details.',
        showConfirmButton: false,
        timer: 1500
      })

    }

    else{

      this.loginService.checkIfUserIsBlocked(this.userLoginClassObject.email).subscribe(
        data=>{
          
          this.isUserBlocked = data;
        
        },
        error=>{ console.log("Something went wrong while checking if user is blacklisted"); }
      );

    }//else

    setTimeout(() => 
    {
      this.waitForIsUserBlockedExecution();
    },
    1500);

    
  }//loginForm()


  waitForIsUserBlockedExecution()
{

  if(this.isUserBlocked === false)
  {

  this.loginService.loginUser(this.userLoginClassObject).subscribe(
    data=>{

      // Store User data in sessionStorage
       
       sessionStorage.setItem("loggedUsername" , data.username);
       sessionStorage.setItem("loggedUserEmail" , data.email);
       sessionStorage.setItem("loggedUserId" , data.userId);
       sessionStorage.setItem("loggedUserRole" , data.role);

       console.log(data);
       console.log("USER ROLE",data.role);
       this.activateSpinner=false;

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Logged in successfully!!!',
        showConfirmButton: false,
        timer: 1500
      }).then((result)=> { 


          //Go To HomePage
           location.replace("/");
           this.router.navigate(['']);
        

      });
    
    
    }, 
    error=>{

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Bad Credentials!!!',
        showConfirmButton: false,
        timer: 1500
      })
      this.activateSpinner=false;
  }
    
  );

}//userBlocked

else if(this.isUserBlocked === true){
  
  this.activateSpinner=false;
 
  Swal.fire({
    position: 'top-end',
    icon: 'error',
    title: 'This account is blocked by Admin!!!',
    showConfirmButton: false,
    timer: 1500
  })
}//else
}//waitFor()



  forgotPassword()
  {

    this.activateSpinner=true;

    this.loginService.checkIfUserIsBlocked(this.userLoginClassObject.email).subscribe(
      data=>{
        this.isUserBlocked = data;
      
      },
      error=>{ console.log("Something went wrong while checking if user is blacklisted"); }
    );

    setTimeout(() => 
    {
      this.waitForUserBlockedToExecute();
    },
    1500);

  
  }//forgot pwd function


  waitForUserBlockedToExecute()
  {
    if(this.userLoginClassObject.email != null)
    { 
      if(this.isUserBlocked == false)
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
      }//if

      else{
    
        this.activateSpinner=false;
    
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'This account is blocked by Admin!!!',
          showConfirmButton: false,
          timer: 1500
        })
      }//else
     
    }

    else{

      
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Fill email-Id field. ',
        showConfirmButton: false,
        timer: 1500
      })
     
    }//else
  

  }


}
