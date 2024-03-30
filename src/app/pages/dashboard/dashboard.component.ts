import { Component } from '@angular/core';
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
export class DashboardComponent {
  readonly dbTabBooking = DbTab.Booking
  readonly dbTabRoom = DbTab.Room
  readonly dbTabRoomCategory = DbTab.RoomCategory
  readonly dbTabAddon = DbTab.Addon

  dbTabActive: DbTab = this.dbTabBooking

  constructor(
    private addonService: AddonService,
    private bookingService: BookingService,
    private roomService: RoomService,
    private roomCategory: RoomCategoryService,
    public loaderService: LoaderService
  ) {

  }

  tabClicked(value: DbTab) {
    this.dbTabActive = value
  }

}
