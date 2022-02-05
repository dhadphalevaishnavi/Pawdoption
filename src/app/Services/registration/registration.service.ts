import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistrationClass } from 'src/app/Classes/registration/registration-class';
import { registerLocaleData } from '@angular/common';
import { Observable } from 'rxjs';
import { Pet } from 'src/app/Classes/pet/pet';
import { UserLogin } from 'src/app/Classes/login/user-login';
import { LoginDataService } from '../login/login-data.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl="http://localhost:8080/PetAdoption";

  constructor(private http:HttpClient) { }

  sendOTP(registrationData:RegistrationClass):Observable<any>
  {

    return this.http.post(`${this.baseUrl}/sendOTP`,registrationData , {responseType: 'text'});
  }

  RegisterNewUser(registrationData:RegistrationClass):Observable<any>
  {

    return this.http.post(`${this.baseUrl}/RegisterUser`,registrationData , {responseType: 'text'});
  }

  sendProfileInfoMail(petData:Pet):Observable<any>
  {

    return this.http.post(`${this.baseUrl}/sendProfileMail/${sessionStorage.getItem('loggedUserEmail')}`,petData , {responseType: 'text'});
  }
 
  resetPassword(loginData:LoginDataService):Observable<any>
  {
    return this.http.put(`${this.baseUrl}/resetPassword`,loginData ,{responseType: 'text'});
  }

  addInInterestedList(petData:Pet):Observable<any>
  {
    return this.http.put(`${this.baseUrl}/addInInterestedList/${petData.petId}/${sessionStorage.getItem('loggedUserId')}` ,{responseType : 'text'} );
  }

  findInterestedUsers(  ):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getInterestUsers/${sessionStorage.getItem("petId")}`);
  }

  rejectUserEnquery(user:RegistrationClass):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/deleteFromInterestedUser/${sessionStorage.getItem("petId")}`,user ,{responseType: 'text'});
  }

  

}
