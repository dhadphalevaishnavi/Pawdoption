import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/Classes/complaint/complaint';
import { ComplaintService } from 'src/app/Services/complaint/complaint.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';
import { PassComplaintEmailService } from 'src/app/Services/pass-complaint-email.service';

@Component({
  selector: 'app-unsolved-complaints',
  templateUrl: './unsolved-complaints.component.html',
  styleUrls: ['./unsolved-complaints.component.css']
})
export class UnsolvedComplaintsComponent implements OnInit {

  complaints:Array<Complaint>;

  constructor(private complaintService:ComplaintService ,private passEmailService:PassComplaintEmailService , private changeComponentService:ChangeComponentService , private router:Router) { }

  ngOnInit(): void {

    this.complaintService.getUnsolvedComplaints().subscribe(
      data=>{
       
        this.complaints = data;
       
      },
      error=>{}
    );    

  }





  blockAccount(blockEmail:string , compId:string)
  {

    Swal.fire({
      title: 'Are you sure?',
      text: "This Account will be blocked!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Block it!'
    }).then((result) => {

      this.complaintService.blockAccount(blockEmail,compId).subscribe(
        data=>{
  
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Account Blocked successfully!!!',
            showConfirmButton: false,
            timer: 1500
          }).then((result)=> { 
  
            this.setComponentToshow('showSolvedComplains');        
  
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

}
