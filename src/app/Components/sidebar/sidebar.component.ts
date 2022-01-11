import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  username:string | null;

  constructor() { }

  ngOnInit(): void {
    this.username=sessionStorage.getItem("loggedUsername");
  }

}
