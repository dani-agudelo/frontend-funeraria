import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Payment } from '../models/payment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}`;
  }

  getPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/payments`);
  }

  view(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/payments/${id}`);
  }

  create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(`${this.baseUrl}/payments`, payment);
  }

  update(payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.baseUrl}/payments/${payment.id}`, payment);
  }

  delete(id: string): Observable<Payment> {
    return this.http.delete<Payment>(`${this.baseUrl}/payments/${id}`);
  }

  getPaymentsBySubscription(id: string): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/subscriptions/${id}/payments`);
  }
}
