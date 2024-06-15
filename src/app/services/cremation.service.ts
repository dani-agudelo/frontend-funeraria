import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cremation } from '../models/cremation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CremationService {
  protected urlBase: string;


  constructor(private http: HttpClient) {
    this.urlBase = `${environment.url_ms_business}`;
  }

  getCremations(): Observable<Cremation[]> {
    return this.http.get<Cremation[]>(`${this.urlBase}/cremations`);
  }

  view(id: string): Observable<Cremation> {
    return this.http.get<Cremation>(`${this.urlBase}/cremations/${id}`);
  }

  create(cremation: Cremation): Observable<Cremation> {
    return this.http.post<Cremation>(`${this.urlBase}/cremations`, cremation);
  }

  update(cremation: Cremation): Observable<Cremation> {
    return this.http.put<Cremation>(`${this.urlBase}/cremations/${cremation.id}`, cremation);
  }

  delete(id: string): Observable<Cremation> {
    return this.http.delete<Cremation>(`${this.urlBase}/cremations/${id}`);
  }

  getCremationsByRoom(idRoom: string): Observable<Cremation[]> {
    return this.http.get<Cremation[]>(`${this.urlBase}/rooms/${idRoom}/cremations`);
  }
}



