import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCategoryDialogComponent } from './room-category-dialog.component';

describe('RoomCategoryDialogComponent', () => {
  let component: RoomCategoryDialogComponent;
  let fixture: ComponentFixture<RoomCategoryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomCategoryDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RoomCategoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
