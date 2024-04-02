import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoomService } from '../../../core/services/room.service';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../../../core/services/loader.service';
import { NotificationService } from '../../../core/services/notification.service';
import { RoomDialogComponent } from '../../dialogs/room-dialog/room-dialog.component';
import { Room } from '../../../core/interfaces/room.interface';
import { RoomCategoryService } from '../../../core/services/room-category.service';
import { RoomInventoryDialogComponent } from '../../dialogs/room-inventory-dialog/room-inventory-dialog.component';

@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.css'
})
export class RoomComponent {

  constructor(
    public roomService: RoomService,
    public roomCategoryService: RoomCategoryService,
    private dialog: MatDialog,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ){

  }

  getRooms(){
    this.loaderService.showLoading()
    this.roomService.get().subscribe({
      next: (res) => {
        this.loaderService.hideLoading();

        if (res?.data) {
          this.roomService.rooms = [];
          for (let i = 0; i < res.data.length; i++) {
            this.roomService.rooms.push(res.data[i])
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

  getRoomCategoryById(room_category_id: number){
    return this.roomCategoryService.roomCategories.find(ele => ele.room_category_id === room_category_id)?.room_category_name ?? 'N/A'
  }

  checkAvailability(room: Room){
    this.loaderService.showLoading()
    this.roomService.getAvailability(room.room_id).subscribe({
      next: (res) => {
        this.loaderService.hideLoading();

        if (res?.data) {
          if(res.data.roomInventory){
            const dialogRef = this.dialog.open(RoomInventoryDialogComponent, {
              minWidth: '250px',
              maxWidth: '350px',
              maxHeight: '250px',
              data: { roomInventory: res.data.roomInventory, room: room},
              disableClose: true
            });
          }else{
            this.notificationService.success(`No Bookings Currently for Room: ${room.room_number}!`)
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

  addRoom(){
    const dialogRef = this.dialog.open(RoomDialogComponent, {
      minWidth: '250px',
      data: { roomCategories:  this.roomCategoryService.roomCategories},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRooms()
      }
    })
  }
}
