import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Awesome} from '../model/awesome';

@Injectable({
  providedIn: 'root'
})
export class AwesomeService {

  constructor(private http: HttpClient) {
  }

  private baseUrl = 'http://localhost:3000/awesomes/';

  getListAwesome(): Observable<any> {
    return this.http.get<Awesome>(`${this.baseUrl}`);
  }

  getAwesomeById(id: number): Observable<Awesome> {
    return this.http.get<Awesome>(`${this.baseUrl}/${id}`);
  }

  createAwesome(awesome: Awesome): Observable<Awesome> {
    return this.http.post<Awesome>(this.baseUrl, awesome);
  }

  updateAwesome( awesome: Awesome): Observable<Awesome> {
    return this.http.put<Awesome>(`${this.baseUrl}/${awesome.id}`, awesome);
  }

  deleteAwesome(id: number): Observable<Awesome> {
    return this.http.delete<Awesome>(`${this.baseUrl}/${id}`);

  }
}
