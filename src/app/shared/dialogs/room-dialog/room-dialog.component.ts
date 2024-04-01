import { Component, Inject } from '@angular/core';
import { RoomService } from '../../../core/services/room.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from '../../../core/services/loader.service';
import { NotificationService } from '../../../core/services/notification.service';
import { RoomCategoryService } from '../../../core/services/room-category.service';
import { CommonModule } from '@angular/common';
import { RoomCategory } from '../../../core/interfaces/room-category.interface';

@Component({
  selector: 'app-room-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './room-dialog.component.html',
  styleUrl: './room-dialog.component.css'
})
export class RoomDialogComponent {

  roomFormGroup: FormGroup;
  roomCategories: RoomCategory[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RoomDialogComponent>,
    public roomService: RoomService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ) {
    this.roomFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      rc: new FormControl('', Validators.required)
    })

    if (this.data && this.data.roomCategories) {
      this.roomCategories = this.data.roomCategories
    } else {
      this.closeDialog()
    }
  }

  saveForm() {
    this.loaderService.showLoading()

    let formValue = this.roomFormGroup.value

    this.roomService.add({
      room_number: formValue.name,
      room_category_id: formValue.rc
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