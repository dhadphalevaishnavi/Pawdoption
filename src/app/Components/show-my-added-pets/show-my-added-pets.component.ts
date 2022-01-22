import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/Classes/pet/pet';
import { PetService } from 'src/app/Services/pet/pet.service';
import { PassSearchResultService } from 'src/app/Services/passSearchResult/pass-search-result.service';

@Component({
  selector: 'app-show-my-added-pets',
  templateUrl: './show-my-added-pets.component.html',
  styleUrls: ['./show-my-added-pets.component.css']
})
export class ShowMyAddedPetsComponent implements OnInit {

  pet: Array<Pet>;
  page: number = 1;
  totalRecords: number;
  public isLoggedIn:string | null ;
  username:string | null; 

  constructor(private petService: PetService , private passSearchResultService: PassSearchResultService) { }

  ngOnInit(): void {
    this.petService.searchPetByOwnerId().subscribe(
      data=>{
        this.pet = data;
      },
      error=>{
        console.log("Something went wrong while searching Pet by user id");
      }
    );
    this.totalRecords = this.passSearchResultService.getPetTotal();
    this.username = sessionStorage.getItem("loggedUsername");
  }


  editPet()
  {

  }

  deletePet()
  {

  }

}
