import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOrdersComponent } from './event-orders.component';

describe('EventOrdersComponent', () => {
  let component: EventOrdersComponent;
  let fixture: ComponentFixture<EventOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
