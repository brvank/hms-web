import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RoomCategoryService } from '../../../core/services/room-category.service';
import { MatDialog } from '@angular/material/dialog';
import { LoaderService } from '../../../core/services/loader.service';
import { NotificationService } from '../../../core/services/notification.service';
import { RoomCategory } from '../../../core/interfaces/room-category.interface';
import { RoomCategoryDialogComponent } from '../../dialogs/room-category-dialog/room-category-dialog.component';

@Component({
  selector: 'app-room-category',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './room-category.component.html',
  styleUrl: './room-category.component.css'
})
export class RoomCategoryComponent {

  constructor(
    public roomCategoryService: RoomCategoryService,
    private dialog: MatDialog,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ){

  }

  getRoomCategories(){
    this.loaderService.showLoading()
    this.roomCategoryService.get().subscribe({
      next: (res) => {
        if (res?.data) {
          this.roomCategoryService.roomCategories = [];
          for (let i = 0; i < res.data.length; i++) {
            this.roomCategoryService.roomCategories.push(res.data[i])
          }

          this.loaderService.hideLoading();
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

  updateRoomCategory(roomCategory: RoomCategory){
    const dialogRef = this.dialog.open(RoomCategoryDialogComponent, {
      minWidth: '250px',
      data: { action: 'update', data: roomCategory },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRoomCategories()
      }
    })
  }

  addRoomCategory(){
    const dialogRef = this.dialog.open(RoomCategoryDialogComponent, {
      minWidth: '250px',
      data: { action: 'add' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getRoomCategories()
      }
    })
  }
}
