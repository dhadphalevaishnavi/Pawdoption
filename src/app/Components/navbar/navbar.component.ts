import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/Services/pet/pet.service';
import { PassSearchResultService } from 'src/app/Services/passSearchResult/pass-search-result.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 

  public petType:string;

  public isLoggedIn:string | null ;
  
  public isUserAdmin:boolean = false;

  constructor(private pet:PetService , private router:Router , private passSearchResultService:PassSearchResultService ,private changeComponentService:ChangeComponentService) {
    this.router.routeReuseStrategy.shouldReuseRoute= () =>false; 

   
    
   }

  ngOnInit(): void {
    this.isLoggedIn = sessionStorage.getItem("loggedUserId"); 
    if(sessionStorage.getItem("loggedUserRole") === "admin")
      this.isUserAdmin = true;
  }

  searchPetByType()
  {
   
    sessionStorage.setItem("searchBarPetType", this.petType);
    return this.pet.searchPetByType().subscribe(
      data=>{

        this.passSearchResultService.setPet(data);
        this.passSearchResultService.setPetTotal(data.length);

    
        this.router.navigate(["/showPets"]);
        
        console.log(this.passSearchResultService.getPet());
      },
      error=>{
        console.log("Error finding Type of Pet");
      }

    );
  }
 
  logout()
  {

    Swal.fire({
      title: 'Logout?',
      text: "Are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {

      if (result.isConfirmed) {


        sessionStorage.clear();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logged out successfully!!!',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {


          //Go To HomePage
          location.replace("/");
          this.router.navigate(['']);


        });


      }//if
    })//then
  }

  setComponentToshow(componentName : string)
  {
    
    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }



}
