import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Subscriptions } from '../models/subscriptions.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  baseUrl: string;
  
  constructor(private http: HttpClient) { 
    this.baseUrl = `${environment.url_ms_business}`;
  }

  getSubscriptions(): Observable<Subscriptions[]> {
    return this.http.get<Subscriptions[]>(`${this.baseUrl}/subscriptions`);
  }
  
  view(id: string): Observable<Subscriptions> {
    return this.http.get<Subscriptions>(`${this.baseUrl}/subscriptions/${id}`);
  }

  create(Subscriptions: Subscriptions): Observable<Subscriptions> {
    return this.http.post<Subscriptions>(`${this.baseUrl}/subscriptions`, Subscriptions);
  }

  update(Subscriptions: Subscriptions): Observable<Subscriptions> {
    return this.http.put<Subscriptions>(`${this.baseUrl}/subscriptions/${Subscriptions.id}`, Subscriptions);
  }

  delete(id: string): Observable<Subscriptions> {
    return this.http.delete<Subscriptions>(`${this.baseUrl}/subscriptions/${id}`);
  }

  getSubscriptionsByCustomer(id: string): Observable<Subscriptions[]> {
   return this.http.get<Subscriptions[]>(`${this.baseUrl}/customers/${id}/subscriptions`);
  }

}

