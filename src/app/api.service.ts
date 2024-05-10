import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL='http://127.0.0.1:8000/api';
  constructor(private http:HttpClient) { }
  getAlltache():Observable<any>{
    return this.http.get<any>(`${this.apiURL}/allTaches`);

  }
  postTache(data:any):Observable<any>{
    return this.http.post<any>(`${this.apiURL}/addTaches`,data);

  }
  delTaches(id:number):Observable<any>{
    return this.http.delete<any>(`${this.apiURL}/deleteTache/${id}`)
  }
}
