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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
