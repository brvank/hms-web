import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Booking, BookingNoID } from '../interfaces/booking.interface';
import { Addon } from '../interfaces/addon.interface';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private baseUrl = environment.baseUrl
  private getEndPoint = 'api/v1/booking/get'
  private addEndPoint = 'api/v1/booking/add'
  private updateEndPoint = 'api/v1/booking/update'
  private addAddonEndPoint = 'api/v1/booking/addOn'

  start: number = 0
  size: number = 10
  total: number = 0

  bookings: Booking[] = []

  constructor(private http: HttpClient) { }

  get(): Observable<any>{

    const url = this.baseUrl + this.getEndPoint + `?start=${this.start}&size=${this.size}`

    return this.http.get(url);
  }

  getById(bookingId: number): Observable<any>{

    const url = this.baseUrl + this.getEndPoint + `/${bookingId}`

    return this.http.get(url);
  }

  add(booking: BookingNoID): Observable<any>{
    
    const url = this.baseUrl + this.addEndPoint

    return this.http.post(url, booking);
  }

  update(booking: Booking): Observable<any>{
    
    const url = this.baseUrl + this.updateEndPoint

    return this.http.put(url, booking);
  }

  addAddon(booking_id: number, addon: Addon): Observable<any>{
    
    const url = this.baseUrl + this.addAddonEndPoint + `/${booking_id}`

    return this.http.put(url, addon);
  }
}
