import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiserProfileComponent } from './organiser-profile.component';

describe('OrganiserProfileComponent', () => {
  let component: OrganiserProfileComponent;
  let fixture: ComponentFixture<OrganiserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganiserProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganiserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
