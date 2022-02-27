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
    return this.http.post(`${this.baseUrl}/raiseComplaint/${sessionStorage.getItem("loggedUserId")}/${sessionStorage.getItem("complaintForPetId")}`, complaint, {responseType: 'text'} );
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

  getSolvedComplaints():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getSolvedComplaints`);
  }

  getUnsolvedComplaints():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getUnsolvedComplaints`);
  }

  blockAccount(email:string , compId:string):Observable<any>
  {
    return this.http.post(`${this.baseUrl}/addUserToBlacklist/${email}/${compId}` , {responseType: 'text'});
  }

  unblockAccount(email:string):Observable<any>
  {
    return this.http.delete(`${this.baseUrl}/deleteUserFromBlacklist/${email}` , {responseType: 'text'});
  }

  getAllBlockedAccounts():Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getAllBlacklistedUsers`);
  }

  getComplaintsFromEmail(email:string):Observable<any>
  {
    return this.http.get(`${this.baseUrl}/getComplaintsFromEmail/${email}`);
  }

} 
