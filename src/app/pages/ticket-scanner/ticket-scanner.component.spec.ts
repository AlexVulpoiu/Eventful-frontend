import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketScannerComponent } from './ticket-scanner.component';

describe('TicketScannerComponent', () => {
  let component: TicketScannerComponent;
  let fixture: ComponentFixture<TicketScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketScannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
