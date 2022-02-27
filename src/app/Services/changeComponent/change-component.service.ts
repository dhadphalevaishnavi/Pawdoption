import { Component, Injectable } from '@angular/core';
import { AddPetComponent } from 'src/app/Components/addPet/add-pet/add-pet.component';
import { QuestionsComponent } from 'src/app/Components/questions/questions.component';
// import { ComplaintComponent } from 'src/app/Components/complaint/complaint.component';
import { ComplaintFormComponent } from 'src/app/Components/complaint-form/complaint-form.component';
import { ShowComplaintsComponent } from 'src/app/Components/show-complaints/show-complaints.component';
import { ShowMyAddedPetsComponent } from 'src/app/Components/show-my-added-pets/show-my-added-pets.component';
import { ShowProfileComponent } from 'src/app/Components/show-profile/show-profile.component';
import { WishListComponent } from 'src/app/Components/wish-list/wish-list.component';
import { ShowInterestedUsersComponent } from 'src/app/Components/show-interested-users/show-interested-users.component';
import { AdminSidebarComponent } from 'src/app/Components/admin-sidebar/admin-sidebar.component';
import { ShowAllComplaintsComponent } from 'src/app/Components/show-all-complaints/show-all-complaints.component';
import { BlockedUsersComponent } from 'src/app/Components/blocked-users/blocked-users.component';
import { UnsolvedComplaintsComponent } from 'src/app/Components/unsolved-complaints/unsolved-complaints.component';
import { ComplaintsByEmailComponent } from 'src/app/Components/complaints-by-email/complaints-by-email.component';

@Injectable({
  providedIn: 'root'
}) 
export class ChangeComponentService {

  componentToDisplay:any;

  constructor() { }

  assignComponent(component :string)
  {
    if(component === 'questionForm')
      this.componentToDisplay = QuestionsComponent;
    
    else if(component === 'addPetForm')
      this.componentToDisplay = AddPetComponent;
    
    else if(component === 'showMycomplaints')
      this.componentToDisplay = ShowComplaintsComponent;

    else if(component === 'complaintsForm')
      this.componentToDisplay = ComplaintFormComponent;
    
    else if(component === 'showMyPets')
      this.componentToDisplay = ShowMyAddedPetsComponent;
    
    else if(component === 'showWishList')
      this.componentToDisplay = WishListComponent;
    
    else if(component === 'showMyProfile')
      this.componentToDisplay = ShowProfileComponent; 
      
    else if(component === 'showInterestedUsers')
      this.componentToDisplay = ShowInterestedUsersComponent;
    
    else if(component === 'adminDashboard')
      this.componentToDisplay = AdminSidebarComponent;

    else if(component === 'showSolvedComplains')
      this.componentToDisplay = ShowAllComplaintsComponent;

    else if(component === 'showUnsolvedComplains')
      this.componentToDisplay = UnsolvedComplaintsComponent;

    else if(component === 'showBlockedAccounts')
      this.componentToDisplay = BlockedUsersComponent;

    else if(component === 'showComplaintsByEmail')
      this.componentToDisplay = ComplaintsByEmailComponent;


    else
        this.componentToDisplay = null;
     


  }

  getComponentToDisplay()
  {
    return this.componentToDisplay;
  }

}
