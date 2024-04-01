import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../core/services/booking.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from '../../../core/services/loader.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Booking } from '../../../core/interfaces/booking.interface';
import { Room } from '../../../core/interfaces/room.interface';
import { RoomCategory } from '../../../core/interfaces/room-category.interface';

@Component({
  selector: 'app-booking-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './booking-dialog.component.html',
  styleUrl: './booking-dialog.component.css'
})

export class BookingDialogComponent {

  bookingFormGroup: FormGroup;
  rooms: Room[] = []
  roomCategories: RoomCategory[] = []

  timesUpdatedPrice = 0

  updatePricingSubscribers = 2

  actionAdd: boolean = false

  bookingId: number = 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<BookingDialogComponent>,
    public bookingService: BookingService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {
    this.bookingFormGroup = new FormGroup({
      guest_name: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
      date_time_check_in: new FormControl('', Validators.required),
      date_time_check_out: new FormControl('', Validators.required),
      person_count: new FormControl(null, [Validators.required, Validators.min(0)]),
      room_id: new FormControl('', Validators.required),
      total_price: new FormControl(0, Validators.required),
      advance_amount: new FormControl(0, Validators.required),
      gst: new FormControl(0, Validators.required)
    })

    this.bookingFormGroup.get('room_id')?.valueChanges.subscribe((room_id) => {
      this.updatePrice(parseInt(room_id, 10), parseInt(this.bookingFormGroup.value.gst, 10))
    })
    
    this.bookingFormGroup.get('gst')?.valueChanges.subscribe((gst) => {
      this.updatePrice(parseInt(this.bookingFormGroup.value.room_id, 10), parseInt(gst, 10))
    })

    if (this.data && this.data?.action) {
      if (this.data.action === 'add') {
        this.actionAdd = true
      } else if (this.data.action === 'update') {
        this.actionAdd = false
        let booking: Booking = this.data.data

        this.bookingId = booking.booking_id
        this.bookingFormGroup.patchValue({
          guest_name: booking.guest_name,
          phone_number: booking.phone_number,
          date_time_check_in: booking.date_time_check_in,
          date_time_check_out: booking.date_time_check_out,
          person_count: booking.person_count,
          room_id: booking.room_id,
          total_price: booking.total_price,
          advance_amount: booking.advance_amount,
          gst: booking.gst
        })
      } else {
        this.closeDialog()
      }
    } else {
      this.closeDialog()
    }

    if (this.data && this.data.rooms && this.data.roomCategories) {
      this.rooms = this.data.rooms
      this.roomCategories = this.data.roomCategories
    } else {
      this.closeDialog()
    }

  }

  updatePrice(room_id: number, gst: number){

    if(this.timesUpdatedPrice < this.updatePricingSubscribers && !this.actionAdd){
      this.timesUpdatedPrice += 1
      return
    }

    if(Number.isNaN(gst)){
      gst = 0
    }

    var room = this.rooms.find(room => room.room_id === room_id)
    var price = 0
    if(room){
      var roomCategory = this.roomCategories.find(rc => rc.room_category_id === room?.room_category_id)
      if(roomCategory){
        price = roomCategory.room_category_price
      }
    }

    this.bookingFormGroup.patchValue({
      total_price: price + price * (gst / 100)
    })
  }

  saveForm() {
    if (this.actionAdd) {
      this.addBooking()
    } else {
      this.updateBooking()
    }
  }

  addBooking() {
    this.loaderService.showLoading()

    let formValue = this.bookingFormGroup.value

    this.bookingService.add({
      guest_name: formValue.guest_name,
      phone_number: formValue.phone_number,
      date_time_check_in: formValue.date_time_check_in,
      date_time_check_out: formValue.date_time_check_out,
      person_count: formValue.person_count,
      room_id: formValue.room_id,
      total_price: formValue.total_price,
      advance_amount: formValue.advance_amount,
      gst: formValue.gst
    }).subscribe({
      next: (res) => {
        this.loaderService.hideLoading()
        if (res?.message) {
          this.notificationService.success(res.message)
          this.dialogRef.close(true)
        }
      },
      error: (err) => {
        this.loaderService.hideLoading()
        if (err?.error?.message) {
          this.notificationService.error(err.error.message)
        } else {
          this.notificationService.error("something went wrong!!!")
        }
      }
    })
  }

  updateBooking() {
    this.loaderService.showLoading()

    let formValue = this.bookingFormGroup.value

    this.bookingService.update({
      booking_id: this.bookingId,
      guest_name: formValue.guest_name,
      phone_number: formValue.phone_number,
      date_time_check_in: formValue.date_time_check_in,
      date_time_check_out: formValue.date_time_check_out,
      person_count: formValue.person_count,
      room_id: formValue.room_id,
      total_price: formValue.total_price,
      advance_amount: formValue.advance_amount,
      gst: formValue.gst
    }).subscribe({
      next: (res) => {
        this.loaderService.hideLoading()
        if (res?.message) {
          this.notificationService.success(res.message)
          this.dialogRef.close(true)
        }
      },
      error: (err) => {
        this.loaderService.hideLoading()
        if (err?.error?.message) {
          this.notificationService.error(err.error.message)
        } else {
          this.notificationService.error("something went wrong!!!")
        }
      }
    })
  }

  closeDialog() {
    this.dialogRef.close()
  }

}