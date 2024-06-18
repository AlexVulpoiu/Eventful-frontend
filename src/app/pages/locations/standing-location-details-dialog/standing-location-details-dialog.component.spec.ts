import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingLocationDetailsDialogComponent } from './standing-location-details-dialog.component';

describe('StandingLocationDetailsDialogComponent', () => {
  let component: StandingLocationDetailsDialogComponent;
  let fixture: ComponentFixture<StandingLocationDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandingLocationDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StandingLocationDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
