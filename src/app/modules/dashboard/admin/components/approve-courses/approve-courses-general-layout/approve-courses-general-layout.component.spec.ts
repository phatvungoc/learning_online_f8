import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveCoursesGeneralLayoutComponent } from './approve-courses-general-layout.component';

describe('ApproveCoursesGeneralLayoutComponent', () => {
  let component: ApproveCoursesGeneralLayoutComponent;
  let fixture: ComponentFixture<ApproveCoursesGeneralLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveCoursesGeneralLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveCoursesGeneralLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
