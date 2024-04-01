import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RoomCategory, RoomCategoryNoId } from '../interfaces/room-category.interface';

@Injectable({
  providedIn: 'root'
})
export class RoomCategoryService {

  private baseUrl = environment.baseUrl
  private getEndPoint = 'api/v1/roomCategory/get'
  private addEndPoint = 'api/v1/roomCategory/add'
  private updateEndPoint = 'api/v1/roomCategory/update'

  roomCategories: RoomCategory[] = []

  constructor(private http: HttpClient) { }

  get(): Observable<any>{

    const url = this.baseUrl + this.getEndPoint

    return this.http.get(url);
  }

  add(roomCategory: RoomCategoryNoId): Observable<any>{
    
    const url = this.baseUrl + this.addEndPoint

    return this.http.post(url, roomCategory);
  }

  update(roomCategory: RoomCategory): Observable<any>{
    
    const url = this.baseUrl + this.updateEndPoint

    return this.http.put(url, roomCategory);
  }
}
