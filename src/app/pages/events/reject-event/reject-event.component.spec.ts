import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectEventComponent } from './reject-event.component';

describe('RejectEventComponent', () => {
  let component: RejectEventComponent;
  let fixture: ComponentFixture<RejectEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RejectEventComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RejectEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
