import { Injectable } from '@angular/core';
import { Serviceexecution } from '../models/serviceexecution.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServiceexecutionService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/service_executions`;
  }

  getServiceexecutions(): Observable<Serviceexecution[]> {
    return this.http.get<Serviceexecution[]>(this.baseUrl);
  }

  view(id: string): Observable<Serviceexecution> {
    return this.http.get<Serviceexecution>(`${this.baseUrl}/${id}`);
  }

  create(Serviceexecution: Serviceexecution): Observable<Serviceexecution> {
    return this.http.post<Serviceexecution>(this.baseUrl, Serviceexecution);
  }

  update(Serviceexecution: Serviceexecution): Observable<Serviceexecution> {
    return this.http.put<Serviceexecution>(`${this.baseUrl}/${Serviceexecution.id}`, Serviceexecution);
  }

  delete(id: number): Observable<Serviceexecution> {
    return this.http.delete<Serviceexecution>(`${this.baseUrl}/${id}`);
  }

  getServiceexecutionByCustomer(id: number): Observable<Serviceexecution[]> {
    return this.http.get<Serviceexecution[]>(`${this.baseUrl}/customer/${id}`);
  }
}
