import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsManagementComponent } from './locations-management.component';

describe('ManagementComponent', () => {
  let component: LocationsManagementComponent;
  let fixture: ComponentFixture<LocationsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocationsManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
