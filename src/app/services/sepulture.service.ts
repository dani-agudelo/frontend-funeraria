import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Sepulture } from '../models/sepulture.model';

@Injectable({
  providedIn: 'root'
})
export class SepultureService {
  protected urlBase: string;

  constructor(private http: HttpClient) {
    this.urlBase = `${environment.url_ms_business}`;
  }

  getSepultures(): Observable<Sepulture[]> {
    return this.http.get<Sepulture[]>(`${this.urlBase}/sepultures`);
  }

  // organizar
  // view(): Observable<Sepulture> {
  //   return this.http.get<Sepulture>(`${this.urlBase}/sepultures`);
  // }

  view(id: string): Observable<Sepulture> {
    return this.http.get<Sepulture>(`${this.urlBase}/sepultures/${id}`);
  }

  create(sepulture: Sepulture): Observable<Sepulture> {
    return this.http.post<Sepulture>(`${this.urlBase}/sepultures`, sepulture);
  }

  update(sepulture: Sepulture): Observable<Sepulture> {
    return this.http.put<Sepulture>(`${this.urlBase}/sepultures/${sepulture.id}`, sepulture);
  }

  delete(id: string): Observable<Sepulture> {
    return this.http.delete<Sepulture>(`${this.urlBase}/sepultures/${id}`);
  }

  getSepulturesByRoom(idRoom: string): Observable<Sepulture[]> {
    return this.http.get<Sepulture[]>(`${this.urlBase}/rooms/${idRoom}/sepultures`);
  }
}


