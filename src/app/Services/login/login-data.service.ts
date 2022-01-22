import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginDataService {

  email:string;
  password:string;

  constructor() { }

  setEmail(mail:string)
  {
    this.email=mail;
  }

  setPassword(password:string)
  {
    this.password=password;
  }

  


}
