import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  username:string | null;
  constructor() { }

  ngOnInit(): void {
    this.username=sessionStorage.getItem("loggedUsername");
  }

}
