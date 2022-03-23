import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentGeneralLayoutComponent } from './student-general-layout.component';

describe('StudentGeneralLayoutComponent', () => {
  let component: StudentGeneralLayoutComponent;
  let fixture: ComponentFixture<StudentGeneralLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGeneralLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentGeneralLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
