import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/Classes/complaint/complaint';
import { ComplaintService } from 'src/app/Services/complaint/complaint.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';


@Component({
  selector: 'app-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.css']
})
export class ComplaintFormComponent implements OnInit {

  complaint = new Complaint();

  edit:string | null;

  constructor(private complaintService:ComplaintService , private changeComponentService:ChangeComponentService , private router:Router) { }

  ngOnInit(): void {

    
  }

  raiseComplaint()
  {

    this.edit = sessionStorage.getItem("editComplaintId");
    console.log(this.edit);
/////////////NEW CPMPLAINT
    if(this.edit == 'null')
    {
    this.complaintService.raiseComplaint(this.complaint).subscribe(
      data=>{

        console.log("complaint Raised");
        this.setComponentToshow('showMycomplaints');
      },
      error=>{
        console.log("Complaint NOT Filed");
      }
    );
    console.log("Complaint Filed");
  }

  /////////EDIT
  else 
  {
    this.complaintService.editComplaint(this.complaint).subscribe(
      data=>{
        console.log("Complaint Edited");
        this.setComponentToshow('showMycomplaints');
        sessionStorage.setItem("editComplaintId" , 'null');
      },
      error=>{
        console.log("Complaint Not Edited");
        sessionStorage.setItem("editComplaintId" , 'null');
      }
    );
  
  }

  }

  setComponentToshow(componentName : string)
  {
    
    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }
  
}
