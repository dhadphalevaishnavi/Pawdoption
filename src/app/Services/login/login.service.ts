import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/Classes/login/user-login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private baseUrl ='http://localhost:8080/PetAdoption/Login';

  constructor(private http:HttpClient) {  }

  loginUser( userLoginClass:UserLogin):Observable<any>
  {
     return this.http.post(`${this.baseUrl}`,userLoginClass);
  }



}
