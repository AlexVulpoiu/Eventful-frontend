import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStandingCategoryComponent } from './add-standing-category.component';

describe('AddStandingCategoryComponent', () => {
  let component: AddStandingCategoryComponent;
  let fixture: ComponentFixture<AddStandingCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStandingCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddStandingCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
