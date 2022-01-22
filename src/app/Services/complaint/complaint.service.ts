import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Complaint } from 'src/app/Classes/complaint/complaint';

@Injectable({ 
  providedIn: 'root'
})
export class ComplaintService {

  private baseUrl ='http://localhost:8080/PetAdoption';

  constructor(private http:HttpClient ) { }

  raiseComplaint(complaint:Complaint):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/raiseComplaint/${sessionStorage.getItem("loggedUserId")}`, complaint, {responseType: 'text'} );
  }

  getComplaints():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getComplaints/${sessionStorage.getItem("loggedUserId")}`);
  }

  deleteComplaint(complaint:Complaint):Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/deleteComplaint/${complaint.complaintId}` , {responseType: 'text'});
  }

  editComplaint(complaint:Complaint):Observable<any>
  {
    return this.http.put(`${this.baseUrl}/editComplaint/${sessionStorage.getItem("editComplaintId")}`, complaint, {responseType: 'text'} );
  }

} 
