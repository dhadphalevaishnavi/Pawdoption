import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeComponentService } from 'src/app/Services/changeComponent/change-component.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  username: string | null;

  showComponent: any;
  public isLoggedIn: string | null;


  constructor(private changeComponentService: ChangeComponentService, private router: Router) {

  }

  ngOnInit(): void {
    this.username = sessionStorage.getItem("loggedUsername");
    this.showComponent = this.changeComponentService.getComponentToDisplay();
  }

  logout() {

    Swal.fire({
      title: 'Logout?',
      text: "Are you sure you want to logout?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {

      if (result.isConfirmed) {


        sessionStorage.clear();

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Logged out successfully!!!',
          showConfirmButton: false,
          timer: 1500
        }).then((result) => {


          //Go To HomePage
          location.replace("/");
          this.router.navigate(['']);


        });


      }//if
    })//then
  }//logout

  setComponentToshow(componentName: string) {

    this.changeComponentService.assignComponent(componentName);
    this.router.navigate(['/questionForm']);

  }

}
