import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Owner } from "../models/owner.model";

@Injectable({
  providedIn: "root",
})
export class OwnerService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/owners`;
  }

  getOwners(): Observable<Owner[]> {
    return this.http.get<Owner[]>(this.baseUrl);
  }

  delete(id: string): Observable<Owner> {
    return this.http.delete<Owner>(`${this.baseUrl}/${id}`);
  }
}
