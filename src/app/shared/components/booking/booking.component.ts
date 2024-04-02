import { Component } from '@angular/core';
import { BookingService } from '../../../core/services/booking.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../../../core/services/loader.service';
import { NotificationService } from '../../../core/services/notification.service';
import { BookingDialogComponent } from '../../dialogs/booking-dialog/booking-dialog.component';
import { RoomService } from '../../../core/services/room.service';
import { Booking } from '../../../core/interfaces/booking.interface';
import { RoomCategoryService } from '../../../core/services/room-category.service';
import { AddonService } from '../../../core/services/addon.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

  constructor(
    public bookingService: BookingService,
    private roomService: RoomService,
    private roomCategoryService: RoomCategoryService,
    private addonService: AddonService,
    private dialog: MatDialog,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ){
    
  }

  prev(){
    if(this.bookingService.start > 0 && this.bookingService.start - this.bookingService.size >= 0){
      this.bookingService.start -= this.bookingService.size

      this.getBookings()
    }
  }

  next(){
    if(this.bookingService.total != 0 && this.bookingService.start + this.bookingService.size < this.bookingService.total){
      this.bookingService.start += this.bookingService.size

      this.getBookings()
    }
  }

  getBookings(){
    this.loaderService.showLoading()
    this.bookingService.get().subscribe({
      next: (res) => {
        this.loaderService.hideLoading();

        if (res?.data && res?.data?.result) {

          this.bookingService.total = res.data.count

          this.bookingService.bookings = [];
          for (let i = 0; i < res.data.result.length; i++) {
            this.bookingService.bookings.push(res.data.result[i])
          }
          
        } else {
          this.notificationService.error('Something went wrong!')
        }
      },
      error: (err) => {
        this.loaderService.hideLoading();
        if (err?.error?.message) {
          this.notificationService.error(err.error.message)
        } else {
          this.notificationService.error("something went wrong!!!")
        }
      }
    })
  }

  addBooking(){
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      minWidth: '250px',
      data: { action: 'add', rooms: this.roomService.rooms, roomCategories: this.roomCategoryService.roomCategories },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getBookings()
      }
    })
  }

  udpateBooking(booking: Booking){
    const dialogRef = this.dialog.open(BookingDialogComponent, {
      minWidth: '250px',
      data: { action: 'update', rooms: this.roomService.rooms, roomCategories: this.roomCategoryService.roomCategories , data: booking },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getBookings()
      }
    })
  }

}
