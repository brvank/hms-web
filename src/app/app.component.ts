import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { LoaderService } from './core/services/loader.service';
import { NotificationComponent } from './shared/components/notification/notification.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './core/services/login.service';
import { RoomCategoryService } from './core/services/room-category.service';
import { RoomService } from './core/services/room.service';
import { AddonService } from './core/services/addon.service';
import { BookingService } from './core/services/booking.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoaderComponent,
    CommonModule,
    NotificationComponent,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    LoginService,
    RoomCategoryService,
    RoomService,
    AddonService,
    BookingService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hms-web';

  constructor(
    public loaderService: LoaderService
  ) { }
}
