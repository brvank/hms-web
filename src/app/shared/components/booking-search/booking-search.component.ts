import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../../core/services/booking.service';
import { Booking } from '../../../core/interfaces/booking.interface';
import { LoaderService } from '../../../core/services/loader.service';
import { NotificationService } from '../../../core/services/notification.service';
import { AddonService } from '../../../core/services/addon.service';
import { Room } from '../../../core/interfaces/room.interface';
import { Addon } from '../../../core/interfaces/addon.interface';

@Component({
  selector: 'app-booking-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './booking-search.component.html',
  styleUrl: './booking-search.component.css'
})
export class BookingSearchComponent {

  bsFormGroup: FormGroup
  bsAddonFormGroup: FormGroup

  booking?: Booking = undefined
  room?: Room = undefined
  bookingAddOn = undefined

  constructor(
    private bookingService: BookingService,
    public addonService: AddonService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {
    this.bsFormGroup = new FormGroup({
      bookingId: new FormControl(null, [Validators.required, Validators.min(0)])
    })

    this.bsAddonFormGroup = new FormGroup({
      addon: new FormControl('', Validators.required),
      quantity: new FormControl(null, [Validators.required, Validators.min(0)])
    })
  }

  getBooking() {
    this.loaderService.showLoading()

    this.booking = undefined
    this.room = undefined
    this.bookingService.getById(this.bsFormGroup.value.bookingId).subscribe({
      next: (res) => {
        this.loaderService.hideLoading()
        if (res?.data) {
          this.booking = res.data
          this.room = res.data.room
          this.bookingAddOn = res.data.bookingAddOn.booking_addons
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

  syncAddOnPrice(){
    this.loaderService.showLoading()

    this.bookingService.syncAddOnPrice(this.booking!.booking_id).subscribe({
      next: (res) => {
        this.loaderService.hideLoading()
        this.notificationService.success(res.message)
        this.getBooking()
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

  addAddon(){
    this.loaderService.showLoading()

    var addonData: Addon = this.addonService.addons.find(ele => ele.addon_id === parseInt(this.bsAddonFormGroup.value.addon))!
    var quantity = this.bsAddonFormGroup.value.quantity
    var addonMap = new Map<number, number>()
    addonMap.set(addonData.addon_id, quantity)
    this.bookingService.addAddon(this.booking!.booking_id, addonMap).subscribe({
      next: (res) => {
        this.loaderService.hideLoading()
        this.notificationService.success(res.message)
        this.getBooking()
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

  getKeys(data: any){
    return Object.keys(data)
  }

  getValues(data: any){
    return Object.values(data)
  }

}
