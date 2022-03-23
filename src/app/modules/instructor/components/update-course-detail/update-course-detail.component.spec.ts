import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCourseDetailComponent } from './update-course-detail.component';

describe('UpdateCourseDetailComponent', () => {
  let component: UpdateCourseDetailComponent;
  let fixture: ComponentFixture<UpdateCourseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCourseDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCourseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
