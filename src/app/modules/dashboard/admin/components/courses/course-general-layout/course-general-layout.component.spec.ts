import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGeneralLayoutComponent } from './course-general-layout.component';

describe('CourseGeneralLayoutComponent', () => {
  let component: CourseGeneralLayoutComponent;
  let fixture: ComponentFixture<CourseGeneralLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseGeneralLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGeneralLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
