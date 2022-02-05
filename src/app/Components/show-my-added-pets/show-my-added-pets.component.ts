import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/Classes/pet/pet';
import { PetService } from 'src/app/Services/pet/pet.service';
import { PassSearchResultService } from 'src/app/Services/passSearchResult/pass-search-result.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';


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

  constructor(private petService: PetService , private passSearchResultService: PassSearchResultService , private changeComponentService:ChangeComponentService , private router:Router) { }

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

  showInterestedPeoples(selectedPet:Pet)
  {
    sessionStorage.setItem("petId", selectedPet.petId);
    this.setComponentToshow("showInterestedUsers");
  }

  editPetInfo(selectedPet:Pet)
  {
    sessionStorage.setItem("petToEdit" , selectedPet.petId);
    this.setComponentToshow("addPetForm");
  }

  editPetStatus(selectedPet:Pet)
  {
 
    
    Swal.fire({
      title: 'Are you sure?',
      text: "Pet adoption status will be changed.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Change status!'
    }).then((result) => {

      if (result.isConfirmed) {

        if(selectedPet.status == "Unadopted")
        {
          selectedPet.status = "Adopted";
        }
        else
        {
          selectedPet.status = "Unadopted";
        }

        this.petService.editPet(selectedPet).subscribe(
          data=>{

            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Status changed successfully!!!',
              showConfirmButton: false,
              timer: 1500
            }).then((result)=> { 
    
              this.setComponentToshow("showMyPets");
    
            });
          
          },
          error=>{
            console.log("Something went wrong while Changing Pet Adopted status");
          }
        ); //subscribe 

      }//if
    
    });//then


  }

  deletePet(selectedPet:Pet)
  {

        
      Swal.fire({
        title: 'Are you sure?',
        text: "This Pet will be deleted permanently!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
  
        if (result.isConfirmed) {
         
          this.petService.deletePet(selectedPet).subscribe(
            data=>{

              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Pet Deleted successfully!!!',
                showConfirmButton: false,
                timer: 1500
              }).then((result)=> { 
      
                this.setComponentToshow("showMyPets");    
      
              });
              

            },
            error=>{
              console.log("Something went wrong while deleting pet");
            }
          ); 

        }
      });


  }

  setComponentToshow(componentName : string)
  {
    
    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }


}
