import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Beneficiary } from "../models/beneficiary.model";

@Injectable({
  providedIn: "root",
})
export class BeneficiaryService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/beneficiaries`;
  }

  getBeneficiaries(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${this.baseUrl}`);
  }

  view(id: string): Observable<Beneficiary> {
    return this.http.get<Beneficiary>(`${this.baseUrl}/${id}`);
  }

  create(data: Beneficiary): Observable<Beneficiary> {
    return this.http.post<Beneficiary>(`${this.baseUrl}`, data);
  }

  update(data: Beneficiary): Observable<Beneficiary> {
    return this.http.put<Beneficiary>(`${this.baseUrl}/${data.id}`, data);
  }

  delete(id: string): Observable<Beneficiary> {
    return this.http.delete<Beneficiary>(`${this.baseUrl}/${id}`);
  }

  getBeneficiariesByOwner(id: string): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${this.baseUrl}/owner/${id}`);
  }
}
