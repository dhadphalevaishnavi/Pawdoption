import { Component, OnInit ,Input } from '@angular/core';
import { PassRegistrationDataService } from 'src/app/Services/registration/pass-registration-data.service';
import { RegistrationClass } from 'src/app/Classes/registration/registration-class';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/registration/registration.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOTPComponent implements OnInit {

  otp:String;
  registrationClassObject:RegistrationClass;

  otpVar:String;

  constructor(private passData:PassRegistrationDataService , private router:Router ,private registrationService:RegistrationService) { }

  ngOnInit(): void {
  
    this.registrationClassObject=this.passData.getRegistrationClassObject();
    this.otp=this.passData.getOtp();
    
  } 

  register()
  {

    if(this.otpVar==this.otp)
    {
      console.log("OTP Matched");
      
      //Register Into Database
      this.registrationService.RegisterNewUser(this.registrationClassObject).subscribe(
        data=>{
         
          this.router.navigate(['']);
        },
        error=>{
          console.log("Something went wrong");
        }
  
       );

     
    }


  }
}
