import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { QuestionsComponent } from './Components/questions/questions.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { VerifyOTPComponent } from './Components/verify-otp/verify-otp.component';
import { AddPetComponent } from './Components/addPet/add-pet/add-pet.component';
import { SearchResultComponent } from './Components/search-result/search-result.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { AddPetSidebarComponent } from './Components/add-pet-sidebar/add-pet-sidebar.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { AdminSidebarComponent } from './Components/admin-sidebar/admin-sidebar.component';
// import { ComplaintComponent } from './Components/complaint/complaint.component';
import { UnsolvedComplaintsComponent } from './Components/unsolved-complaints/unsolved-complaints.component';
import { ComplaintsByEmailComponent } from './Components/complaints-by-email/complaints-by-email.component';

const routes: Routes = [

  {
    path:"",
    component:HomeComponent,
    pathMatch:"full"
  },

  {
    path:"Login",
    component:LoginComponent,
    pathMatch:"full"
  },

  {
    path:"sendOTP",
    component:RegistrationComponent,
    pathMatch:"full"
  },

  {
    path:"verifyOtp",
    component:VerifyOTPComponent,
    
  },

  {
    path:"questionForm",
    component:SidebarComponent
  },

  {
    path:"adminDashboard",
    component:AdminSidebarComponent
  },

  {
    path:"addPet",
    component:AddPetSidebarComponent
  },

  {
    path:'showPets',
    component:SearchResultComponent
  },

  {
    path:'reset-Password',
    component:ResetPasswordComponent
  },

  {
    path:"showUnsolvedComplains",
    component:UnsolvedComplaintsComponent
  },

  {
    path:"complaintsByEmail",
    component:ComplaintsByEmailComponent
  }


  // {
  //   path:'complaintForm',
  //   component:ComplaintComponent
  // }


];

@NgModule({
  imports: [RouterModule.forRoot(routes , {onSameUrlNavigation:'reload'} ) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
