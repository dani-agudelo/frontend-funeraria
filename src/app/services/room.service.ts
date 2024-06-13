import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  baseUrl: string;
  

  constructor(private http: HttpClient) {
    this.baseUrl = `${environment.url_ms_business}/rooms`;
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}`);
  }

  getRoomsByHeadquarter(id: string): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.baseUrl}/headquarter/${id}`);
  }

  view(id: string): Observable<Room> {
    return this.http.get<Room>(`${this.baseUrl}/${id}`);
  }

  create(Room: Room): Observable<Room> {
    return this.http.post<Room>(`${this.baseUrl}`, Room);
  }

  update(Room: Room): Observable<Room> {
    return this.http.put<Room>(`${this.baseUrl}/${Room.id}`,Room);
  }

  delete(id: string): Observable<Room> {
    return this.http.delete<Room>(`${this.baseUrl}/${id}`);
  }
}
