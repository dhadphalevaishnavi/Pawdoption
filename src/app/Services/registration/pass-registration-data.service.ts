import { Injectable } from '@angular/core';
import { RegistrationClass } from 'src/app/Classes/registration/registration-class';


@Injectable({
  providedIn: 'root'
})
export class PassRegistrationDataService {

  otp:String;
  registrationClassObject:RegistrationClass;

  constructor() { }

  setOtp(otp:String)
  {
    this.otp=otp;
  }
 
  setRegistrationClassObject( registrationClassObject:RegistrationClass)
  {
    this.registrationClassObject=registrationClassObject;
  }

  getOtp()
  {
    return this.otp;
  }

  getRegistrationClassObject()
  {
    return this.registrationClassObject;
  }

}
