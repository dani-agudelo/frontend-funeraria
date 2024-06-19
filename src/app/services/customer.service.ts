import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Customer } from "../models/customer.model";

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/customers`;
  }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  getCustomersByUser(_id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/user/${_id}`);
  }

  getCustomersWithOutOwner(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseUrl}/without_owner`);
  }

  view(id: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer);
  }

  update(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/${customer.id}`, customer);
  }

  delete(id: string): Observable<Customer> {
    return this.http.delete<Customer>(`${this.baseUrl}/${id}`);
  }
}
