import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCharitableCauseComponent } from './edit-charitable-cause.component';

describe('EditCharitableCauseComponent', () => {
  let component: EditCharitableCauseComponent;
  let fixture: ComponentFixture<EditCharitableCauseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditCharitableCauseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditCharitableCauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
