import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import { Headquarter } from '../models/headquarter.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadquarterService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/headquarters`;
  }

  getHeadquarters(): Observable<Headquarter[]> {
    return this.http.get<Headquarter[]>(this.baseUrl);
  }

  view(id: string): Observable<Headquarter> {
    return this.http.get<Headquarter>(`${this.baseUrl}/${id}`);
  }

  create(headquarter: Headquarter): Observable<Headquarter> {
    return this.http.post<Headquarter>(this.baseUrl, headquarter);
  }

  update(headquarter: Headquarter): Observable<Headquarter> {
    return this.http.put<Headquarter>(`${this.baseUrl}/${headquarter.id}`, headquarter);
  }

  delete(id: string): Observable<Headquarter> {
    return this.http.delete<Headquarter>(`${this.baseUrl}/${id}`);
  }
}
