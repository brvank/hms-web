import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Addon, AddonNoId } from '../../../core/interfaces/addon.interface';
import { AddonService } from '../../../core/services/addon.service';
import { NotificationService } from '../../../core/services/notification.service';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-addon-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './addon-dialog.component.html',
  styleUrl: './addon-dialog.component.css'
})
export class AddonDialogComponent {

  addonFormGroup: FormGroup;

  actionAdd: boolean = false

  addonId: number = 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddonDialogComponent>,
    private addonService: AddonService,
    private notificationService: NotificationService,
    private loaderService: LoaderService
  ){
    this.addonFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      info: new FormControl('', Validators.required)
    })

    if(this.data && this.data?.action){
      if(this.data.action === 'add'){
        this.actionAdd = true
      }else if(this.data.action === 'update'){
        this.actionAdd = false
        let addon: Addon = this.data.data

        this.addonId = addon.addon_id
        this.addonFormGroup.patchValue({
          name: addon.addon_name,
          price: addon.addon_price,
          info: addon.addon_info
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

    let formValue = this.addonFormGroup.value
    this.addonService.add({
      addon_name: formValue.name,
      addon_info: formValue.info,
      addon_price: formValue.price
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

    let formValue = this.addonFormGroup.value
    this.addonService.update({
      addon_id: this.addonId,
      addon_name: formValue.name,
      addon_info: formValue.info,
      addon_price: formValue.price
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
