import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/Classes/pet/pet';
import { PetService } from 'src/app/Services/pet/pet.service';
import { PassSearchResultService } from 'src/app/Services/passSearchResult/pass-search-result.service';
import { Router } from '@angular/router';

import { RegistrationService } from 'src/app/Services/registration/registration.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  pet: Array<Pet>;
  page: number = 1;
  totalRecords: number;
  public isLoggedIn:string | null ;
  username:string | null; 

  constructor(private petService: PetService , private passSearchResultService: PassSearchResultService , private router:Router ,private emailService: RegistrationService) { }
 
  ngOnInit(): void {

    this.petService.getWishList().subscribe(
      data=>{
        this.pet = data;
      },
      error=>{}  
    );

    this.totalRecords = this.passSearchResultService.getPetTotal();
    this.username = sessionStorage.getItem("loggedUsername");
    this.isLoggedIn = sessionStorage.getItem("loggedUserId");
  }


  sendEnquaryMail(selectedPet: Pet) {
    if (sessionStorage.getItem("loggedUsername") != null) {
      this.emailService.sendProfileInfoMail(selectedPet).subscribe(
        data => {
          console.log("Profile email sent");
        },
        error => {
          console.log("Profile NOT SEND");
        }
      );
    }
    else {
      console.log("Login to send email");
    }
  }



  raiseComplaint()
  {
    this.router.navigate(['/complaintForm']);
    
  }

  removeFromWishList(){

  }


}
