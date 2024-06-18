import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Preference } from "../models/preference.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class MercadopagoService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.url_mp_api;
  }

  createPreference(data: Preference): Observable<Preference> {
    return this.http.post<Preference>(`${this.baseUrl}/preference`, data);
  }

  getPreference(id: string): Observable<Preference> {
    return this.http.get<Preference>(`${this.baseUrl}/preference/${id}`);
  }

  getPayment(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/payment/${id}`);
  }
}
