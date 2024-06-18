import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganisersComponent } from './view-organisers.component';

describe('ViewOrganisersComponent', () => {
  let component: ViewOrganisersComponent;
  let fixture: ComponentFixture<ViewOrganisersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOrganisersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOrganisersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
