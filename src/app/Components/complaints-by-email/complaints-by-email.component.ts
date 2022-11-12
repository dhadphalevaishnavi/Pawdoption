import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/Classes/complaint/complaint';
import { ComplaintService } from 'src/app/Services/complaint/complaint.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';
import { ComplaintEmail } from 'src/app/Classes/complaint-email';
import { PassComplaintEmailService } from 'src/app/Services/pass-complaint-email.service';

@Component({
  selector: 'app-complaints-by-email',
  templateUrl: './complaints-by-email.component.html',
  styleUrls: ['./complaints-by-email.component.css']
})
export class ComplaintsByEmailComponent implements OnInit {

  complaints:Array<Complaint>;
 
  emailId : string ;

  constructor(private complaintService:ComplaintService ,private passEmailService:PassComplaintEmailService, private changeComponentService:ChangeComponentService , private router:Router) { } 

  ngOnInit(): void
   {
    this.emailId = this.passEmailService.getEmail();
    this.complaintService.getComplaintsFromEmail(this.emailId).subscribe(
      data=>{
      
        this.complaints = data;
        
      },
      error=>{}
    );    

  }


 

}
