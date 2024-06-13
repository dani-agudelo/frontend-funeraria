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
    this.urlBase = `${environment.url_ms_business}/sepultures`;
  }

  // getSepultures(): Observable<Sepulture[]> {
  //   return this.http.get<Sepulture[]>(this.urlBase);
  // }

  view(): Observable<Sepulture> {
    return this.http.get<Sepulture>(this.urlBase);
  }

  create(sepulture: Sepulture): Observable<Sepulture> {
    return this.http.post<Sepulture>(this.urlBase, sepulture);
  }

  update(sepulture: Sepulture): Observable<Sepulture> {
    return this.http.put<Sepulture>(`${this.urlBase}/${sepulture.id}`, sepulture);
  }

  delete(id: string): Observable<Sepulture> {
    return this.http.delete<Sepulture>(`${this.urlBase}/${id}`);
  }
}


