import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/Classes/complaint/complaint';
import { ComplaintService } from 'src/app/Services/complaint/complaint.service';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';
import { Blocklist } from 'src/app/Classes/blocklist';

@Component({
  selector: 'app-blocked-users',
  templateUrl: './blocked-users.component.html',
  styleUrls: ['./blocked-users.component.css']
})
export class BlockedUsersComponent implements OnInit {

  blocklist:Array<Blocklist>;

  constructor(private complaintService:ComplaintService , private changeComponentService:ChangeComponentService , private router:Router) { }

  ngOnInit(): void {

    this.complaintService.getAllBlockedAccounts().subscribe(
      data=>{
        
        this.blocklist=data;
      
      },
      error=>{}
    );

  }


  unblockAccount(blockEmail:string)
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
  
            this.setComponentToshow('showBlockedUsers');        
  
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


}
