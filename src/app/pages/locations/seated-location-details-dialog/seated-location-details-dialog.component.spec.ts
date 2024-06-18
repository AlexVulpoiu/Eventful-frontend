import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatedLocationDetailsDialogComponent } from './seated-location-details-dialog.component';

describe('SeatedLocationDetailsDialogComponent', () => {
  let component: SeatedLocationDetailsDialogComponent;
  let fixture: ComponentFixture<SeatedLocationDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeatedLocationDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeatedLocationDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
