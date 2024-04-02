import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomInventoryDialogComponent } from './room-inventory-dialog.component';

describe('RoomInventoryDialogComponent', () => {
  let component: RoomInventoryDialogComponent;
  let fixture: ComponentFixture<RoomInventoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomInventoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomInventoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
