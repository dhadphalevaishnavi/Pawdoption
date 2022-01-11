import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { QuestionsComponent } from './Components/questions/questions.component';
import { RegistrationComponent } from './Components/registration/registration.component';
import { VerifyOTPComponent } from './Components/verify-otp/verify-otp.component';
import { AddPetComponent } from './Components/addPet/add-pet/add-pet.component';
import { SearchResultComponent } from './Components/search-result/search-result.component';


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
    component:QuestionsComponent
  },

  {
    path:"addPet",
    component:AddPetComponent
  },

  {
    path:'showPets',
    component:SearchResultComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes , {onSameUrlNavigation:'reload'} ) ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
