import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistrationComponent } from './Components/registration/registration.component';
import { HomeComponent } from './Components/home/home.component';
import { VerifyOTPComponent } from './Components/verify-otp/verify-otp.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { QuestionsComponent } from './Components/questions/questions.component';
import { AddPetComponent } from './Components/addPet/add-pet/add-pet.component';
import { FooterComponent } from './Components/footer/footer/footer.component';
import { SearchResultComponent } from './Components/search-result/search-result.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { AddPetSidebarComponent } from './Components/add-pet-sidebar/add-pet-sidebar.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
// import { ComplaintComponent } from './Components/complaint/complaint.component';
import { ComplaintFormComponent } from './Components/complaint-form/complaint-form.component';
import { ShowProfileComponent } from './Components/show-profile/show-profile.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { ShowComplaintsComponent } from './Components/show-complaints/show-complaints.component';
import { ShowMyAddedPetsComponent } from './Components/show-my-added-pets/show-my-added-pets.component';
import { ShowInterestedUsersComponent } from './Components/show-interested-users/show-interested-users.component';
import { AdminSidebarComponent } from './Components/admin-sidebar/admin-sidebar.component';
import { ShowAllComplaintsComponent } from './Components/show-all-complaints/show-all-complaints.component';
import { BlockedUsersComponent } from './Components/blocked-users/blocked-users.component';
import { UnsolvedComplaintsComponent } from './Components/unsolved-complaints/unsolved-complaints.component';
import { ComplaintsByEmailComponent } from './Components/complaints-by-email/complaints-by-email.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistrationComponent,
    HomeComponent,
    VerifyOTPComponent,
    QuestionsComponent,
    AddPetComponent,
    FooterComponent,
    SearchResultComponent,
    SidebarComponent,
    AddPetSidebarComponent,
    ResetPasswordComponent,
    // ComplaintComponent,
    ComplaintFormComponent,
    ShowProfileComponent,
    WishListComponent,
    ShowComplaintsComponent,
    ShowMyAddedPetsComponent,
    ShowInterestedUsersComponent,
    AdminSidebarComponent,
    ShowAllComplaintsComponent,
    BlockedUsersComponent,
    UnsolvedComplaintsComponent,
    ComplaintsByEmailComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
    
  ],
  entryComponents:[
    ComplaintFormComponent,
    AddPetComponent,
    QuestionsComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
