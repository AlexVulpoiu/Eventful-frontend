import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeatsCategoryComponent } from './add-seats-category.component';

describe('AddSeatsCategoryComponent', () => {
  let component: AddSeatsCategoryComponent;
  let fixture: ComponentFixture<AddSeatsCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSeatsCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddSeatsCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
