import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeatedLocationComponent } from './add-seated-location.component';

describe('AddSeatedLocationComponent', () => {
  let component: AddSeatedLocationComponent;
  let fixture: ComponentFixture<AddSeatedLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSeatedLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSeatedLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
