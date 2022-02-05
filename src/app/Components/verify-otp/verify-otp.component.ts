import { Component, OnInit, Input } from '@angular/core';
import { PassRegistrationDataService } from 'src/app/Services/registration/pass-registration-data.service';
import { RegistrationClass } from 'src/app/Classes/registration/registration-class';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/Services/registration/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOTPComponent implements OnInit {

  otp: String;
  registrationClassObject: RegistrationClass;

  otpVar: String;

  constructor(private passData: PassRegistrationDataService, private router: Router, private registrationService: RegistrationService) { }

  ngOnInit(): void {

    this.registrationClassObject = this.passData.getRegistrationClassObject();
    this.otp = this.passData.getOtp();

  }

  register() {

    if (this.otpVar == this.otp) {
      
      //check if forgot password?
       if (sessionStorage.getItem("forgotPassword") == "true") {

        sessionStorage.removeItem("forgotPassword");
        this.router.navigate(['/reset-Password']);
      

      }

      else {
        //Register Into Database
        this.registrationService.RegisterNewUser(this.registrationClassObject).subscribe(
          data => {
            
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Registered Successfully!!!',
              showConfirmButton: false,
              timer: 1500
            }).then((Result=>{
              this.router.navigate(['']);
            }))
          
          },
          error => {
            console.log("Something went wrong");
          }

        );
      }

    }

    else{

      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Wrong OTP!!!',
        showConfirmButton: false,
        timer: 1500
      })
     
    }


  }
}
