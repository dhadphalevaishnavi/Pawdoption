import { Component, Injectable } from '@angular/core';
import { AddPetComponent } from 'src/app/Components/addPet/add-pet/add-pet.component';
import { QuestionsComponent } from 'src/app/Components/questions/questions.component';
import { ComplaintComponent } from 'src/app/Components/complaint/complaint.component';
import { ComplaintFormComponent } from 'src/app/Components/complaint-form/complaint-form.component';
import { ShowComplaintsComponent } from 'src/app/Components/show-complaints/show-complaints.component';
import { ShowMyAddedPetsComponent } from 'src/app/Components/show-my-added-pets/show-my-added-pets.component';
import { ShowProfileComponent } from 'src/app/Components/show-profile/show-profile.component';
import { WishListComponent } from 'src/app/Components/wish-list/wish-list.component';
import { ShowInterestedUsersComponent } from 'src/app/Components/show-interested-users/show-interested-users.component';

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
    
    else
        this.componentToDisplay = null;
     


  }

  getComponentToDisplay()
  {
    return this.componentToDisplay;
  }

}
