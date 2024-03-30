import { Injectable } from '@angular/core';
import { Notification } from '../interfaces/notification.interface';
import { NotificationType } from '../enum/notification-type.enum';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notifications: Notification[] = []

  timeout: number = 4000

  constructor() { }

  error(msg: string){
    this.notifications.push({
      msg: msg,
      type: NotificationType.Error
    })

    setTimeout(() => {
      this.removeNotification(msg)
    }, this.timeout)
  }

  success(msg: string){
    this.notifications.push({
      msg: msg,
      type: NotificationType.Success
    })

    setTimeout(() => {
      this.removeNotification(msg)
    }, this.timeout)
  }

  removeNotification(msg: string){
    let index = this.notifications.findIndex(ele => ele.msg === msg)
    if(index !== -1){
      this.notifications.splice(index, 1)
    }
  }
}
