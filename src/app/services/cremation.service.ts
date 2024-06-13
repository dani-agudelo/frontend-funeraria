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
    this.urlBase = `${environment.url_ms_business}/cremations`;
  }

  // getCremations(): Observable<Cremation[]> {
  //   return this.http.get<Cremation[]>(this.urlBase);
  // }

  view(): Observable<Cremation> {
    return this.http.get<Cremation>(this.urlBase);
  }

  create(cremation: Cremation): Observable<Cremation> {
    return this.http.post<Cremation>(this.urlBase, cremation);
  }

  update(cremation: Cremation): Observable<Cremation> {
    return this.http.put<Cremation>(`${this.urlBase}/${cremation.id}`, cremation);
  }

  delete(id: string): Observable<Cremation> {
    return this.http.delete<Cremation>(`${this.urlBase}/${id}`);
  }

}



