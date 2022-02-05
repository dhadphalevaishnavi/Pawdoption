import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pet } from 'src/app/Classes/pet/pet';
import { Observable } from 'rxjs';
import { NavbarComponent } from 'src/app/Components/navbar/navbar.component';


@Injectable({
  providedIn: 'root'
})
export class PetService {

  private baseUrl="http://localhost:8080/PetAdoption";

  constructor(private http:HttpClient ) { }


  addPet(pet:Pet):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/addPet/${sessionStorage.getItem("loggedUserId")}` , pet , {responseType:"text"});
  }

  editPet(pet:Pet):Observable<any>
  {
    return this.http.put(`${this.baseUrl}/editPet/${sessionStorage.getItem("loggedUserId")}` , pet , {responseType:"text"});
  }

  getPets():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/showAllPets`);
  }

  searchPetByType():Observable<any>
  {
   
    return this.http.get(`${this.baseUrl}/searchPetByType/${sessionStorage.getItem("searchBarPetType")}` );
  }

  searchPetByOwnerId():Observable<any>
  {
   
    return this.http.get(`${this.baseUrl}/searchPetByOwnerId/${sessionStorage.getItem("loggedUserId")}` );
  }

  getWishList():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getWishList/${sessionStorage.getItem("loggedUserId")}`);
  }

  addwish(pet:Pet):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/addToWishList/${sessionStorage.getItem("loggedUserId")}` ,pet , {responseType:"text"});
  }

  removeWish(pet:Pet):Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/removeFromWishList/${sessionStorage.getItem("loggedUserId")}/${pet.petId}`, {responseType:"text"});
  }

  deletePet(pet:Pet):Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/deletePet/${pet.petId}`, {responseType:"text"});
  }

  
}
