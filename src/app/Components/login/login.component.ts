import { Component, OnInit } from '@angular/core';
import { UserLogin } from 'src/app/Classes/login/user-login';
import { LoginService } from 'src/app/Services/login/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userLoginClassObject = new UserLogin();

  constructor(private loginService:LoginService , private router: Router) { }

  ngOnInit(): void {
  }


  loginForm()
  {
    
    this.loginService.loginUser(this.userLoginClassObject).subscribe(
      data=>{

        // Store User data in sessionStorage
         
         sessionStorage.setItem("loggedUsername" , data.username);
         sessionStorage.setItem("loggedUserEmail" , data.email);
         sessionStorage.setItem("loggedUserId" , data.userId);

         location.replace("/");
        
         //Go To HomePage
         this.router.navigate(['']);
      }, 
      error=>console.log("Bad Credential")
      
    );
    
  }

}
