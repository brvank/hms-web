import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room, RoomNoId } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private baseUrl = environment.baseUrl
  private getEndPoint = 'api/v1/room/get'
  private addEndPoint = 'api/v1/room/add'

  rooms: Room[] = []

  constructor(private http: HttpClient) { }

  get(): Observable<any>{

    const url = this.baseUrl + this.getEndPoint

    return this.http.get(url);
  }

  add(room: RoomNoId): Observable<any>{
    
    const url = this.baseUrl + this.addEndPoint

    return this.http.post(url, room);
  }
}
