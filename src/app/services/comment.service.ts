import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Commment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}`;
   }

   getComments(): Observable<Commment[]> {
    return this.http.get<Commment[]>(`${this.baseUrl}/comments`);
  }

  view(id: string): Observable<Commment> {
    return this.http.get<Commment>(`${this.baseUrl}/comments/${id}`);
  }

  create(comment: Commment): Observable<Commment> {
    return this.http.post<Commment>(`${this.baseUrl}/comments`, comment);
  }

  update(comment: Commment): Observable<Commment> {
    return this.http.put<Commment>(`${this.baseUrl}/comments/${comment.id}`, comment);
  }

  delete(id: string): Observable<Commment> {
    return this.http.delete<Commment>(`${this.baseUrl}/comments/${id}`);
  }

  getCommentsByServiceExecution(id: string): Observable<Commment[]> {
    return this.http.get<Commment[]>(`${this.baseUrl}/service_executions/${id}/comments`);
  }
}
