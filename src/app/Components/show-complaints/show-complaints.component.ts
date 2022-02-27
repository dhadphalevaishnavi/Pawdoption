import { Component, OnInit } from '@angular/core';
// import { Complaint } from 'src/app/Classes/complaint/complaint';
import { Complaint } from 'src/app/Classes/complaint/complaint';
import { ComplaintService } from 'src/app/Services/complaint/complaint.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-show-complaints',
  templateUrl: './show-complaints.component.html',
  styleUrls: ['./show-complaints.component.css']
})
export class ShowComplaintsComponent implements OnInit {

  username:string | null; 
  complaints:Array<Complaint>;

  //complaintObject:Complaint;

  constructor(private complaintService:ComplaintService , private changeComponentService:ChangeComponentService , private router:Router) { }

  ngOnInit(): void {

    this.username = sessionStorage.getItem("loggedUsername");

    this.complaintService.getComplaints().subscribe(
      data=>{
        this.complaints = data;
      },
      error=>{
        console.log("Something wrong while getting complaints");
      }
    );

  }

  editComplaint(selectedComplaint : Complaint){

    sessionStorage.setItem("editComplaintId" ,selectedComplaint.complaintId);
    this.setComponentToshow('complaintsForm');

  } 


  deleteComplaint(complaintObject : Complaint)
  { 

    Swal.fire({
      title: 'Are you sure?',
      text: "This complaint will be deleted permanently!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {
          
    this.complaintService.deleteComplaint(complaintObject).subscribe(
      data=>{

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Complaint Deleted successfully!!!',
          showConfirmButton: false,
          timer: 1500
        }).then((result)=> { 

          this.setComponentToshow('showMycomplaints');        

        });
      
       
    },
      error=>{
        console.log("Not deleted");
      }
    );


      }

    })

 
  }

  // showModelPopup(selectedComplaint : Complaint)
  // {

  // }

  setComponentToshow(componentName : string)
  {
    
    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }

}
