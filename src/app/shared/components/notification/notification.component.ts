import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';
import { NotificationType } from '../../../core/enum/notification-type.enum';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  error = NotificationType.Error
  success = NotificationType.Success

  constructor(
    public notificationService: NotificationService
  ) {
    // setTimeout(() => {
    //   notificationService.error('error 1')
    // }, 3000)

    
    // setTimeout(() => {
    //   notificationService.error('error 2')
    // }, 3000)

    
    // setTimeout(() => {
    //   notificationService.success('success 1')
    // }, 3000)

    
    // setTimeout(() => {
    //   notificationService.success('success 2')
    // }, 3000)
  }
}
