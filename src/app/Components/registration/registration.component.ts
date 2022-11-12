import { Component, OnInit } from '@angular/core';
import { RegistrationClass } from 'src/app/Classes/registration/registration-class';
import { RegistrationService } from 'src/app/Services/registration/registration.service';
import { PassRegistrationDataService } from 'src/app/Services/registration/pass-registration-data.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login/login.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

   registrationData =new RegistrationClass();

   public activateSpinner:boolean;
   isUserBlocked:boolean;
 
 
  constructor(private registrationService:RegistrationService,private loginService:LoginService  , private router:Router , private passData:PassRegistrationDataService) { }

  ngOnInit(): void {
    this.activateSpinner=false;
   
   
  }

  sendOTPToUser()
  {
    this.activateSpinner=true;
  

    if(this.registrationData.password != this.registrationData.password2 || this.registrationData.email == null || this.registrationData.password == null || this.registrationData.password2 == null || this.registrationData.username == null)
    {

      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Please fill all details correctly.',
        showConfirmButton: false,
        timer: 1500
      })

      this.activateSpinner=false;
    }

   else
   {
    
    this.loginService.checkIfUserIsBlocked(this.registrationData.email).subscribe(
      data=>{
       
        this.isUserBlocked = data;
             
      },
      error=>{ console.log("Something went wrong while checking if user is blacklisted"); }
    );

    setTimeout(() => 
    {
      this.waitForCheckIfUserIsBlockedExecution();
    },
    1500);

   }//else


  }//function

  waitForCheckIfUserIsBlockedExecution()
  {
    if(this.isUserBlocked == false)
    {
      this.registrationService.sendOTP(this.registrationData).subscribe(
        data=>{
        
          this.passData.setOtp(data);
          this.passData.setRegistrationClassObject(this.registrationData);

          this.activateSpinner=false;
          this.router.navigate(['verifyOtp']);
        },
        error=>{
          this.activateSpinner=false;
          console.log("Something went wrong");
        }

     );
    
    }//if
  
    else if(this.isUserBlocked == true){

     
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

}//class
