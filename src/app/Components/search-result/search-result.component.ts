import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/Classes/pet/pet';
import { PetService } from 'src/app/Services/pet/pet.service';
import { PassSearchResultService } from 'src/app/Services/passSearchResult/pass-search-result.service';
import { RegistrationService } from 'src/app/Services/registration/registration.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';


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
    console.log(this.isLoggedIn);
  }

  sendEnquaryMail(selectedPet: Pet) { 
    if (sessionStorage.getItem("loggedUsername") != null) {
      this.emailService.sendProfileInfoMail(selectedPet).subscribe(
        data => {
        
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Enquiry email sent!!!',
            showConfirmButton: false,
            timer: 1500
          })

          this.emailService.addInInterestedList(selectedPet).subscribe(
            data=>{      console.log(data);      },
            error=>{      console.log(error);      }
          );

        },
        error => {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Something went wrong!',
            showConfirmButton: false,
            timer: 1500
          })
        }
      );
    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Please login to send enquiry!!!',
        showConfirmButton: false,
        timer: 1500
      })
     
    }
  }



  addNewWish(selectedPet:Pet)
  {

    this.petService.addwish(selectedPet).subscribe(
      data=>{

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Pet added to wish-list!!!',
          showConfirmButton: false,
          timer: 1500
        })
       
      },
      error=>{
        console.log("Wish not Added");
      }
      
    );

  }


  redirect()
  {
   
    this.router.navigate(["/Login"]);
  }

  setComponentToshow(componentName: string , selectedPet:Pet) {

    if(componentName === "complaintsForm")
    {
      sessionStorage.setItem("complaintForPetId", selectedPet.petId);
    }

    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }


}
