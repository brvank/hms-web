import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Addon, AddonNoId } from '../interfaces/addon.interface';

@Injectable({
  providedIn: 'root'
})
export class AddonService {

  private baseUrl = environment.baseUrl
  private getEndPoint = 'api/v1/addOn/get'
  private addEndPoint = 'api/v1/addOn/add'
  private updateEndPoint = 'api/v1/addOn/update'

  addons: Addon[] = []

  constructor(private http: HttpClient) { }

  get(): Observable<any>{

    const url = this.baseUrl + this.getEndPoint

    return this.http.get(url);
  }

  add(addon: AddonNoId): Observable<any>{
    
    const url = this.baseUrl + this.addEndPoint

    return this.http.post(url, addon);
  }

  update(addon: Addon): Observable<any>{
    
    const url = this.baseUrl + this.updateEndPoint

    return this.http.put(url, addon);
  }
}
