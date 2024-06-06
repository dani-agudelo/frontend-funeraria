import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServicePlan } from '../models/service-plan.model';

@Injectable({
  providedIn: 'root'
})
export class ServiceplanService {

  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/service_plans`;
  }

  getServicePlans(): Observable<ServicePlan[]> {
    return this.http.get<ServicePlan[]>(`${this.baseUrl}`);
  }

  getServicePlanByPlan(id: string): Observable<ServicePlan[]> {
    return this.http.get<ServicePlan[]>(`${this.baseUrl}/plan/${id}`);
  }

  view(id: string): Observable<ServicePlan> {
    return this.http.get<ServicePlan>(`${this.baseUrl}/${id}`);
  }

  create(ServicePlan: ServicePlan): Observable<ServicePlan> {
    return this.http.post<ServicePlan>(`${this.baseUrl}`, ServicePlan);
  }

  update(ServicePlan: ServicePlan): Observable<ServicePlan> {
    return this.http.put<ServicePlan>(
      `${this.baseUrl}/${ServicePlan.id}`,
      ServicePlan,
    );
  }

  delete(id: string): Observable<ServicePlan> {
    return this.http.delete<ServicePlan>(`${this.baseUrl}/${id}`);
  }
}
