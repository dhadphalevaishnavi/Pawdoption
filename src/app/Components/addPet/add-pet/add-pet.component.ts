import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/Classes/pet/pet';
import { PetService } from 'src/app/Services/pet/pet.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css'] 
})
export class AddPetComponent implements OnInit {

  pet=new Pet();
  
  constructor(private petService:PetService) { }

  ngOnInit(): void {
  }

  addPet()
  {
    this.petService.addPet(this.pet).subscribe(
      data=>{
        console.log("Added New Pet");
      },
      error=>{
        console.log("Error while adding Pet");
      }
      
    );
  }

}
