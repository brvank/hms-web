import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Room } from '../../../core/interfaces/room.interface';

@Component({
  selector: 'app-room-inventory-dialog',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './room-inventory-dialog.component.html',
  styleUrl: './room-inventory-dialog.component.css'
})
export class RoomInventoryDialogComponent {

  bookings: any[] = []
  room?: Room

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    public dialogRef: MatDialogRef<RoomInventoryDialogComponent>
  ) {
    if (this.data && this.data.roomInventory && this.data.room) {
      this.bookings = Object.keys(this.data.roomInventory.bookings ?? {}).map(key => ({ [key]: this.data.roomInventory.bookings[key] }))
      this.room = this.data.room

      //filter out only true values
      this.bookings.filter(obj => {
        const value = Object.values(obj)[0];
        return value === true;
      });

      //sorting the bookings array based on the date
      this.bookings.sort((a, b) => {
        const keyA = Object.keys(a)[0];
        const keyB = Object.keys(b)[0];
        return keyA.localeCompare(keyB);
      });
    } else {
      this.closeDialog()
    }
  }

  getKey(booking: any){
    const date = new Date(Object.keys(booking)[0]);
    return `${date.getUTCDate()}/${date.getUTCMonth()+1}/${date.getUTCFullYear()}`
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
