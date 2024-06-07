import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandingLocationComponent } from './add-standing-location.component';

describe('AddStandingLocationComponent', () => {
  let component: AddStandingLocationComponent;
  let fixture: ComponentFixture<AddStandingLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStandingLocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStandingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
