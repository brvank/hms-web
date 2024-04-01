import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LoaderService } from '../../../core/services/loader.service';
import { NotificationService } from '../../../core/services/notification.service';
import { RoomCategoryService } from '../../../core/services/room-category.service';
import { RoomCategory } from '../../../core/interfaces/room-category.interface';

@Component({
  selector: 'app-room-category-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './room-category-dialog.component.html',
  styleUrl: './room-category-dialog.component.css'
})
export class RoomCategoryDialogComponent {

  roomCategoryFormGroup: FormGroup;

  actionAdd: boolean = false

  roomCategoryId: number = 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<RoomCategoryDialogComponent>,
    private roomCategoryService: RoomCategoryService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ){
    this.roomCategoryFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      info: new FormControl('', Validators.required)
    })

    if(this.data && this.data?.action){
      if(this.data.action === 'add'){
        this.actionAdd = true
      }else if(this.data.action === 'update'){
        this.actionAdd = false
        let roomCategory: RoomCategory = this.data.data

        this.roomCategoryId = roomCategory.room_category_id
        this.roomCategoryFormGroup.patchValue({
          name: roomCategory.room_category_name,
          price: roomCategory.room_category_price,
          info: roomCategory.room_category_info
        })
      }else{
        this.closeDialog()
      }
    }else{
      this.closeDialog()
    }
  }

  saveForm(){
    if(this.actionAdd){
      this.addAddon()
    }else{
      this.updateAddon()
    }
  }

  addAddon(){
    this.loaderService.showLoading()

    let formValue = this.roomCategoryFormGroup.value
    this.roomCategoryService.add({
      room_category_name: formValue.name,
      room_category_info: formValue.info,
      room_category_price: formValue.price
    }).subscribe({
      next: (res)=>{
        this.loaderService.hideLoading()
        if(res?.message){
          this.notificationService.success(res.message)
          this.dialogRef.close(true)
        }
      },
      error: (err)=>{
        this.loaderService.hideLoading()
        if (err?.error?.message) {
          this.notificationService.error(err.error.message)
        } else {
          this.notificationService.error("something went wrong!!!")
        }
      }
    })
  }

  updateAddon(){
    this.loaderService.showLoading()

    let formValue = this.roomCategoryFormGroup.value
    this.roomCategoryService.update({
      room_category_id: this.roomCategoryId,
      room_category_name: formValue.name,
      room_category_info: formValue.info,
      room_category_price: formValue.price
    }).subscribe({
      next: (res)=>{
        this.loaderService.hideLoading()
        if(res?.message){
          this.notificationService.success(res.message)
          this.dialogRef.close(true)
        }
      },
      error: (err)=>{
        this.loaderService.hideLoading()
        if (err?.error?.message) {
          this.notificationService.error(err.error.message)
        } else {
          this.notificationService.error("something went wrong!!!")
        }
      }
    })
  }

  closeDialog(){
    this.dialogRef.close()
  }

}