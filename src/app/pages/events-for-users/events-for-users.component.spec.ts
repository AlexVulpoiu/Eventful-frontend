import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsForUsersComponent } from './events-for-users.component';

describe('EventsForUsersComponent', () => {
  let component: EventsForUsersComponent;
  let fixture: ComponentFixture<EventsForUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsForUsersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsForUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
