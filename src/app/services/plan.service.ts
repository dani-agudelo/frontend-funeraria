import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Plan } from '../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}`;
  }

  getPlans(): Observable<Plan[]> {
    return this.http.get<Plan[]>(`${this.baseUrl}/plans`);
  }

  view(id: string): Observable<Plan> {
    return this.http.get<Plan>(`${this.baseUrl}/plans/${id}`);
  }

  create(Plan: Plan): Observable<Plan> {
    return this.http.post<Plan>(`${this.baseUrl}/plans`, Plan);
  }

  update(Plan: Plan): Observable<Plan> {
    return this.http.put<Plan>(`${this.baseUrl}/plans/${Plan.id}`, Plan);
  }

  delete(id: string): Observable<Plan> {
    return this.http.delete<Plan>(`${this.baseUrl}/plans/${id}`);
  }

}

