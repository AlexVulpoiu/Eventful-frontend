import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiserRegisterComponent } from './organiser-register.component';

describe('OrganiserRegisterComponent', () => {
  let component: OrganiserRegisterComponent;
  let fixture: ComponentFixture<OrganiserRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganiserRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganiserRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
