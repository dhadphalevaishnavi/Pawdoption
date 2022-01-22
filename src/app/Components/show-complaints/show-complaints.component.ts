import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/Classes/complaint/complaint';
import { ComplaintService } from 'src/app/Services/complaint/complaint.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';


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
    console.log(complaintObject);
    this.complaintService.deleteComplaint(complaintObject).subscribe(
      data=>{
        console.log("deleted");
        this.setComponentToshow('showMycomplaints');
    },
      error=>{
        console.log("Not deleted");
      }
    );

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
