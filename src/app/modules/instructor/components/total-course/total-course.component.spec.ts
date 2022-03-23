import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCourseComponent } from './total-course.component';

describe('TotalCourseComponent', () => {
  let component: TotalCourseComponent;
  let fixture: ComponentFixture<TotalCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TotalCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
