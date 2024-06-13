import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Relocation } from '../models/relocation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RelocationService {
  protected urlBase: string;


  constructor(private http: HttpClient) {
    this.urlBase = `${environment.url_ms_business}/relocations`;
  }

  // getRelocations(): Observable<Relocation[]> {
  //   return this.http.get<Relocation[]>(this.urlBase);
  // }

  view(): Observable<Relocation> {
    return this.http.get<Relocation>(this.urlBase);
  }

  create(relocation: Relocation): Observable<Relocation> {
    return this.http.post<Relocation>(this.urlBase, relocation);
  }

  update(relocation: Relocation): Observable<Relocation> {
    return this.http.put<Relocation>(`${this.urlBase}/${relocation.id}`, relocation);
  }

  delete(id: string): Observable<Relocation> {
    return this.http.delete<Relocation>(`${this.urlBase}/${id}`);
  }
}

