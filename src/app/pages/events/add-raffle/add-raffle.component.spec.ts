import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRaffleComponent } from './add-raffle.component';

describe('AddRaffleComponent', () => {
  let component: AddRaffleComponent;
  let fixture: ComponentFixture<AddRaffleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRaffleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddRaffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
