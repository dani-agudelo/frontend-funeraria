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
    this.baseUrl = `${environment.url_ms_business}`;
  }

  getBeneficiariesByOwner(id: string): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(
      `${this.baseUrl}/owners/${id}/beneficiaries`,
    );
  }

  getBeneficiaries(): Observable<Beneficiary[]> {
    return this.http.get<Beneficiary[]>(`${this.baseUrl}/beneficiaries`);
  }

  delete(id: string): Observable<Beneficiary> {
    return this.http.delete<Beneficiary>(`${this.baseUrl}/${id}`);
  }
}
