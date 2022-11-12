import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/Classes/complaint/complaint';
import { ComplaintService } from 'src/app/Services/complaint/complaint.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';
import { PassComplaintEmailService } from 'src/app/Services/pass-complaint-email.service';

@Component({ 
  selector: 'app-show-all-complaints',
  templateUrl: './show-all-complaints.component.html',
  styleUrls: ['./show-all-complaints.component.css']
})
export class ShowAllComplaintsComponent implements OnInit {

  complaints:Array<Complaint>;
 

  constructor(private complaintService:ComplaintService ,private passEmailService:PassComplaintEmailService , private changeComponentService:ChangeComponentService , private router:Router) { }

  ngOnInit(): void {

    this.complaintService.getSolvedComplaints().subscribe(
      data=>{
       
        this.complaints = data;
        
      },
      error=>{}
    );    

  }


  unblockAccount(blockEmail:string )
  {

    Swal.fire({
      title: 'Are you sure?',
      text: "This Account will be Unblocked!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Unblock it!'
    }).then((result) => {

      this.complaintService.unblockAccount(blockEmail).subscribe(
        data=>{
  
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Account Unblocked successfully!!!',
            showConfirmButton: false,
            timer: 1500
          }).then((result)=> { 
  
            this.setComponentToshow('showUnsolvedComplains');        
  
          });
  
        },//data
        error=>{}
        ); //subscribe

    })//swal then


    
  }//blockAccount
  

  setComponentToshow(componentName: string) {

    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/adminDashboard']);

  }


  showAllComplaintsOfUser(email:string)
  {
    this.passEmailService.setEmail(email);
    this.setComponentToshow("showComplaintsByEmail");
  }

}//class