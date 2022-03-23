import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorGeneralLayoutComponent } from './instructor-general-layout.component';

describe('InstructorGeneralLayoutComponent', () => {
  let component: InstructorGeneralLayoutComponent;
  let fixture: ComponentFixture<InstructorGeneralLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorGeneralLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorGeneralLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
