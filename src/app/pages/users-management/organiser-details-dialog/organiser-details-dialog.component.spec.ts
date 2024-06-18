import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganiserDetailsDialogComponent } from './organiser-details-dialog.component';

describe('OrganiserDetailsDialogComponent', () => {
  let component: OrganiserDetailsDialogComponent;
  let fixture: ComponentFixture<OrganiserDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganiserDetailsDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganiserDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
