import { Component, OnInit } from '@angular/core';
// import { Complaint } from 'src/app/Classes/complaint/complaint';
import { Complaint } from 'src/app/Classes/complaint/complaint';
import { ComplaintService } from 'src/app/Services/complaint/complaint.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css']
})
export class ComplaintFormComponent implements OnInit {

  complaint = new Complaint();

  edit: string | null;

  constructor(private complaintService: ComplaintService, private changeComponentService: ChangeComponentService, private router: Router) { }

  ngOnInit(): void {


  }

  raiseComplaint() {

    this.edit = sessionStorage.getItem("editComplaintId");

    if (this.complaint.description == null || this.complaint.catagory == null) {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Please fill all fields. ',
        showConfirmButton: false,
        timer: 1500
      })
    }

    else {

      Swal.fire({
        title: 'Are you sure?',
        text: "You want to file complaint?",
        icon: 'warning',
        showCancelButton: true, 
        confirmButtonColor: '#3085d6', 
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, file complaint!'
      }).then((result) => {

        if (result.isConfirmed) {

          /////////////NEW CPMPLAINT
          if (this.edit === 'null') {
            this.complaintService.raiseComplaint(this.complaint).subscribe(
              data => {

                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Complaint raised successfully!!!',
                  showConfirmButton: false,
                  timer: 1500
                }).then((result) => {

                  this.setComponentToshow('showMycomplaints');

                });

              },
              error => {
                console.log("Complaint NOT Filed");
              }
            );
            console.log("Complaint Filed");
          }

          /////////EDIT
          else {
            this.complaintService.editComplaint(this.complaint).subscribe(
              data => {

                Swal.fire({
                  position: 'top-end',
                  icon: 'success',
                  title: 'Complaint raised successfully!!!',
                  showConfirmButton: false,
                  timer: 1500
                }).then((result) => {

                  this.setComponentToshow('showMycomplaints');
                  sessionStorage.setItem("editComplaintId", 'null');


                });


              },
              error => {
                console.log("Complaint Not Edited");
                sessionStorage.setItem("editComplaintId", 'null');
              }
            );

          }
        }



      })//then

    }
  }

  setComponentToshow(componentName: string) {

 
    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }

}
