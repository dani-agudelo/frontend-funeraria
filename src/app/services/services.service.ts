import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Service } from "../models/service.model";

@Injectable({
  providedIn: "root",
})
export class ServicesService {
  protected urlBase: string;

  constructor(private http: HttpClient) {
    this.urlBase = `${environment.url_ms_business}/services`;
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.urlBase);
  }
}
