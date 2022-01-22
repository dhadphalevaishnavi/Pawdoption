import { Component, OnInit } from '@angular/core';
import { RegistrationClass } from 'src/app/Classes/registration/registration-class';
import { RegistrationService } from 'src/app/Services/registration/registration.service';
import { PassRegistrationDataService } from 'src/app/Services/registration/pass-registration-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

   registrationData =new RegistrationClass();
 
 
 
  constructor(private registrationService:RegistrationService , private router:Router , private passData:PassRegistrationDataService) { }

  ngOnInit(): void {
  }

  sendOTPToUser()
  {
    if(this.registrationData.password == this.registrationData.password2)
    {
      console.log("Correct Password");
      this.registrationService.sendOTP(this.registrationData).subscribe(
      data=>{
       
        this.passData.setOtp(data);
        this.passData.setRegistrationClassObject(this.registrationData);

        this.router.navigate(['verifyOtp']);
      },
      error=>{
        console.log("Something went wrong");
      }

     );
   }
 }

}
