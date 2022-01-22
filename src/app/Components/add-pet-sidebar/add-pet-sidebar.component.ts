import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-pet-sidebar',
  templateUrl: './add-pet-sidebar.component.html',
  styleUrls: ['./add-pet-sidebar.component.css']
})
export class AddPetSidebarComponent implements OnInit {
 
  username:string | null;
  constructor() { }

  ngOnInit(): void {
    this.username=sessionStorage.getItem("loggedUsername");
  }

}
