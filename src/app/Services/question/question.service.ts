import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from 'src/app/Classes/question/question';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private baseUrl="http://localhost:8080/PetAdoption";

  constructor(private http:HttpClient) { }


  addAnswers( questionData:Question):Observable<any>
  {

    return this.http.post(`${this.baseUrl}/addAnswersToQuestions/${sessionStorage.getItem("loggedUserId")}`,questionData , {responseType: 'text'});
  }

  editAnswers( questionData:Question):Observable<any>
  {

    return this.http.put(`${this.baseUrl}/editAnswersToQuestions/${sessionStorage.getItem("loggedUserId")}`,questionData , {responseType: 'text'});
  }

  checkAnswersExists ( questionData:Question):Observable<any>
  {

    return this.http.get(`${this.baseUrl}/searchQuestionExists/${sessionStorage.getItem("loggedUserId")}`);
  }

  findUserProfile ( ):Observable<any>
  {

    return this.http.get(`${this.baseUrl}/findUserProfile/${sessionStorage.getItem("loggedUserId")}`);
  }

}
