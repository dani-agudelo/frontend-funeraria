import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pqr } from '../models/pqr.model';

@Injectable({
  providedIn: 'root'
})
export class PqrService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/pqr`;
  }

  getPqrs(): Observable<Pqr[]> {
    return this.http.get<Pqr[]>(this.baseUrl);
  }

  view(id: string): Observable<Pqr> {
    return this.http.get<Pqr>(`${this.baseUrl}/${id}`);
  }

  create(pqr: Pqr): Observable<Pqr> {
    return this.http.post<Pqr>(this.baseUrl, pqr);
  }

  update(pqr: Pqr): Observable<Pqr> {
    return this.http.put<Pqr>(`${this.baseUrl}/${pqr.id}`, pqr);
  }

  delete(id: string): Observable<Pqr> {
    return this.http.delete<Pqr>(`${this.baseUrl}/${id}`);
  }
  
}
