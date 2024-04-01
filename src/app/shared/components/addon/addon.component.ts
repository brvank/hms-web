import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddonService } from '../../../core/services/addon.service';
import { Addon } from '../../../core/interfaces/addon.interface';
import { MatDialog } from '@angular/material/dialog';
import { AddonDialogComponent } from '../../dialogs/addon-dialog/addon-dialog.component';
import { LoaderService } from '../../../core/services/loader.service';
import { NotificationService } from '../../../core/services/notification.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-addon',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './addon.component.html',
  styleUrl: './addon.component.css'
})
export class AddonComponent {

  constructor(
    public addonService: AddonService,
    private dialog: MatDialog,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ){

  }

  getAddons(){
    this.loaderService.showLoading()
    this.addonService.get().subscribe({
      next: (res) => {
        if (res?.data) {
          this.addonService.addons = [];
          for (let i = 0; i < res.data.length; i++) {
            this.addonService.addons.push(res.data[i])
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

  updateAddon(addon: Addon){
    const dialogRef = this.dialog.open(AddonDialogComponent, {
      minWidth: '250px',
      data: { action: 'update', data: addon },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAddons()
      }
    })
  }

  addAddon(){
    const dialogRef = this.dialog.open(AddonDialogComponent, {
      minWidth: '250px',
      data: { action: 'add' },
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAddons()
      }
    })
  }
}
