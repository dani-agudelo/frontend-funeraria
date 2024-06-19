import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { NotificationInvoice } from "../models/notification-invoice.model";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.url_ms_notifications;
  }

  sendInvoice(data: NotificationInvoice) {
    return this.http.post(`${this.baseUrl}/invoice`, data);
  }
}
