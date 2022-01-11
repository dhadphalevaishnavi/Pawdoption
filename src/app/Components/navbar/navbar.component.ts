import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/Services/pet/pet.service';
import { PassSearchResultService } from 'src/app/Services/passSearchResult/pass-search-result.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;  

  public petType:string;

  public isLoggedIn:string | null ;
  

  constructor(private pet:PetService , private router:Router , private passSearchResultService:PassSearchResultService) {
    this.router.routeReuseStrategy.shouldReuseRoute= () =>false; 

   
    
   }

  ngOnInit(): void {
    this.isLoggedIn = sessionStorage.getItem("loggedUserId");
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

    sessionStorage.clear();
    this.isLoggedIn=sessionStorage.getItem("loggedUserId");
    console.log(this.isLoggedIn);
    console.log("Logout...............");
  }

}
