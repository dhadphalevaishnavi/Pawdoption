import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit { 

  username:string | null;

  showComponent : any;
  public isLoggedIn:string | null ;
  

  constructor(private changeComponentService:ChangeComponentService , private router:Router) { 
   
  }

  ngOnInit(): void {
    this.username=sessionStorage.getItem("loggedUsername");
    this.showComponent = this.changeComponentService.getComponentToDisplay();
  }

  logout()
  {

    sessionStorage.clear();
    this.isLoggedIn=sessionStorage.getItem("loggedUserId");
    // this.router.navigate(['']); 
    // window.location.reload();
    location.replace("/");
    console.log("Logout...............");
  }

  setComponentToshow(componentName : string)
  {
    
    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }

}
