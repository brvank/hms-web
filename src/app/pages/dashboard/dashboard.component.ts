import { Component, OnInit } from '@angular/core';
import { AddonComponent } from '../../shared/components/addon/addon.component';
import { BookingComponent } from '../../shared/components/booking/booking.component';
import { RoomComponent } from '../../shared/components/room/room.component';
import { RoomCategoryComponent } from '../../shared/components/room-category/room-category.component';
import { AddonService } from '../../core/services/addon.service';
import { BookingService } from '../../core/services/booking.service';
import { RoomService } from '../../core/services/room.service';
import { RoomCategoryService } from '../../core/services/room-category.service';
import { DbTab } from '../../core/enum/dashboard.enum';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { LoaderService } from '../../core/services/loader.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AddonComponent,
    BookingComponent,
    RoomComponent,
    RoomCategoryComponent,
    LoaderComponent,
    CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  readonly dbTabBooking = DbTab.Booking
  readonly dbTabRoom = DbTab.Room
  readonly dbTabRoomCategory = DbTab.RoomCategory
  readonly dbTabAddon = DbTab.Addon

  dbTabActive: DbTab = this.dbTabBooking

  dataRefreshRequired: boolean = false

  constructor(
    private router: Router,
    private addonService: AddonService,
    private bookingService: BookingService,
    private roomService: RoomService,
    private roomCategoryService: RoomCategoryService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('token') === null) {
      this.router.navigate(['login'])
    }else{
      this.refreshData()
    }
  }

  tabClicked(value: DbTab) {
    this.dbTabActive = value
  }

  refreshData() {
    this.dataRefreshRequired = false
    this.loaderService.showLoading()
    this.roomCategoryService.get().subscribe({
      next: (res) => {
        if (res?.data) {
          this.roomCategoryService.roomCategories = [];
          for (let i = 0; i < res.data.length; i++) {
            this.roomCategoryService.roomCategories.push(res.data[i])
          }

          this.roomService.get().subscribe({
            next: (res) => {
              if (res?.data) {
                this.roomService.rooms = [];
                for (let i = 0; i < res.data.length; i++) {
                  this.roomService.rooms.push(res.data[i])
                }

                this.addonService.get().subscribe({
                  next: (res) => {
                    if (res?.data) {
                      this.addonService.addons = [];
                      for (let i = 0; i < res.data.length; i++) {
                        this.addonService.addons.push(res.data[i])
                      }

                      this.loaderService.hideLoading();

                      this.getBookings(0, 10);
                    } else {
                      this.notificationService.error('Something went wrong!')
                    }
                  },
                  error: (err) => {
                    this.dataRefreshRequired = true
                    this.loaderService.hideLoading();
                    if (err?.error?.message) {
                      this.notificationService.error(err.error.message)
                    } else {
                      this.notificationService.error("something went wrong!!!")
                    }
                  }
                })
              } else {
                this.notificationService.error('Something went wrong!')
              }
            },
            error: (err) => {
              this.dataRefreshRequired = true
              this.loaderService.hideLoading();
              if (err?.error?.message) {
                this.notificationService.error(err.error.message)
              } else {
                this.notificationService.error("something went wrong!!!")
              }
            }
          })
        } else {
          this.notificationService.error('Something went wrong!')
        }
      },
      error: (err) => {
        this.dataRefreshRequired = true
        this.loaderService.hideLoading();
        if (err?.error?.message) {
          this.notificationService.error(err.error.message)
        } else {
          this.notificationService.error("something went wrong!!!")
        }
      }
    })
  }

  getBookings(start: number, size: number){
    this.loaderService.showLoading();
    this.bookingService.get().subscribe({
      next: (res) => {
        if (res?.data && res?.data?.result) {
          this.bookingService.bookings = [];
          for (let i = 0; i < res.data.result.length; i++) {
            this.bookingService.bookings.push(res.data.result[i])
          }
          
          this.loaderService.hideLoading();
        } else {
          this.notificationService.error('Something went wrong!')
        }
      },
      error: (err) => {
        this.dataRefreshRequired = true
        this.loaderService.hideLoading();
        if (err?.error?.message) {
          this.notificationService.error(err.error.message)
        } else {
          this.notificationService.error("something went wrong!!!")
        }
      }
    })
  }

}
