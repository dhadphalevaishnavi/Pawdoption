import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/Classes/pet/pet';
import { PetService } from 'src/app/Services/pet/pet.service';
import { PassSearchResultService } from 'src/app/Services/passSearchResult/pass-search-result.service';
import { RegistrationService } from 'src/app/Services/registration/registration.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';



@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  pet: Array<Pet>;
  page: number = 1;
  totalRecords: number;
  public isLoggedIn:string | null ;

  constructor(private petService: PetService, private passSearchResultService: PassSearchResultService,private changeComponentService: ChangeComponentService, private emailService: RegistrationService ,private router:Router) {

  }

  ngOnInit(): void {

    this.pet = this.passSearchResultService.getPet();
    this.totalRecords = this.passSearchResultService.getPetTotal();

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



  addNewWish(selectedPet:Pet)
  {

    this.petService.addwish(selectedPet).subscribe(
      data=>{

        console.log("Wish Added");
      },
      error=>{
        console.log("Wish not Added");
      }
      
    );

  }



  setComponentToshow(componentName: string) {

    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }


}
