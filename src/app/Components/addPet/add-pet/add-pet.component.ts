import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/Classes/pet/pet';
import { PetService } from 'src/app/Services/pet/pet.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  pet = new Pet();

  constructor(private petService: PetService, private changeComponentService: ChangeComponentService, private router: Router) { }

  ngOnInit(): void {
  }

  addPet() {

    if (this.pet.ageMonths == null || this.pet.ageYears == null || this.pet.bread == null || this.pet.color == null ||
      this.pet.description == null || this.pet.gender == null || this.pet.petCity == null || this.pet.petName == null || this.pet.petType == null) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Please fill All details.',
        showConfirmButton: false,
        timer: 1500
      })
    }

    else {
      this.petService.addPet(this.pet).subscribe(
        data => {
         
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Pet added successfully!',
            showConfirmButton: false,
            timer: 1500
          })
          this.setComponentToshow('');
        },
        
        error => {

          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Error while adding Pet',
            showConfirmButton: false,
            timer: 1500
          })
         
        }

      );
    }
  }

  setComponentToshow(componentName: string) {

    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }

}
