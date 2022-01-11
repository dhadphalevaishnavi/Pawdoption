import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/Classes/pet/pet';
import { PetService } from 'src/app/Services/pet/pet.service';
import { PassSearchResultService } from 'src/app/Services/passSearchResult/pass-search-result.service';
import { RegistrationService } from 'src/app/Services/registration/registration.service';



@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  pet : Array<Pet> ;
  page:number=1;
  totalRecords:number;

  constructor(private petService:PetService , private passSearchResultService:PassSearchResultService , private emailService:RegistrationService ) {
  
   }

  ngOnInit(): void {
  
    this.pet=this.passSearchResultService.getPet();
    this.totalRecords=this.passSearchResultService.getPetTotal();
   
  }

  sendEnquaryMail(selectedPet:Pet)
  {
    this.emailService.sendProfileInfoMail(selectedPet).subscribe(
      data=>{
        console.log("Profile email sent");
      },
      error=>{
        console.log("Profile NOT SEND");
      }
    );
  }


}
