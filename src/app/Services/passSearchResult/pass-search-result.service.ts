import { Injectable } from '@angular/core';
import { Pet } from 'src/app/Classes/pet/pet';

@Injectable({
  providedIn: 'root'
})
export class PassSearchResultService {

  pet:Array<Pet>; 
  petTotal:number;

  constructor() { }

  setPetTotal(count:number)
  {
    this.petTotal=count;
  }

  getPetTotal()
  {
    return this.petTotal;
  }

  setPet(pet:Array<Pet>)
  {
    this.pet=pet;
  }

  getPet()
  {
    return this.pet;
  }

}
