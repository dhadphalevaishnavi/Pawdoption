import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/Classes/pet/pet';
import { PetService } from 'src/app/Services/pet/pet.service';
import { PassSearchResultService } from 'src/app/Services/passSearchResult/pass-search-result.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import { RegistrationService } from 'src/app/Services/registration/registration.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  pet: Array<Pet>;
  page: number = 1;
  totalRecords: number;
  public isLoggedIn: string | null;
  username: string | null;

  constructor(private petService: PetService, private passSearchResultService: PassSearchResultService, private router: Router, private emailService: RegistrationService, private changeComponentService: ChangeComponentService) { }

  ngOnInit(): void {

    this.petService.getWishList().subscribe(
      data => {
        this.pet = data;
      },
      error => { }
    );

    this.totalRecords = this.passSearchResultService.getPetTotal();
    this.username = sessionStorage.getItem("loggedUsername");
    this.isLoggedIn = sessionStorage.getItem("loggedUserId");
  }


  sendEnquaryMail(selectedPet: Pet) {

    if (sessionStorage.getItem("loggedUsername") != null) {

      Swal.fire({
        title: 'Are you sure?',
        text: "This action will share your profile information to pet's current owner.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, share profile!'
      }).then((result) => {
        if (result.isConfirmed) {


          this.emailService.sendProfileInfoMail(selectedPet).subscribe(
            data => {


              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Enquiry sent successfully!!!',
                showConfirmButton: false,
                timer: 1500
              })

              this.emailService.addInInterestedList(selectedPet).subscribe(
                data => { console.log(data); },
                error => { console.log(error); }
              );

            }, 
            error => {


              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Enqiury not sent!',
                showConfirmButton: false,
                timer: 1500
              })

            }
          );//subscribe


        }
      })




    }
    else {

      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: 'Please login to send Enquiry. ',
        showConfirmButton: false,
        timer: 1500
      })

    }
  }




  raiseComplaint() {
    this.router.navigate(['/complaintForm']);

  }

  removeFromWishList(pet: Pet) {

    Swal.fire({
      title: 'Are you sure?',
      text: "By clicking Yes this pet will be removed from your wish-list.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove!'
    }).then((result) => { 
      
      if (result.isConfirmed) {

        this.petService.removeWish(pet).subscribe(
          data => {
           
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Pet removed from wish-list successfully!!!',
              showConfirmButton: false,
              timer: 1500
            }).then((result)=> { 
    
              this.setComponentToshow("showWishList");
        
            });
           
          },
          error => { console.log("Problem faced while removing from wish list"); }
        );


      }//if
    
    })//then


  }

  setComponentToshow(componentName: string) {

    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }

  setComponentToshow2(componentName: string , selectedPet:Pet) {

    if(componentName === "complaintsForm")
    {
      sessionStorage.setItem("complaintForPetId", selectedPet.petId);
    }

    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }


}
