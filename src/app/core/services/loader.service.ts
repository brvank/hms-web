import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading: boolean = true;

  constructor() { }

  showLoading(){
    this.isLoading = true;
  }

  hideLoading(){
    this.isLoading = false;
  }
}