import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';

import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';
import { CourseService } from 'src/app/services/course/course.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss'],
})
export class CourseListComponent implements OnInit {
  isAuthenticated: boolean;

  loadedCourses: Array<Course> = [];
  outStandingCourses: Array<Course> = [];
  constructor(
    private courseService: CourseService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();

    if (!this.isAuthenticated) {
      this.courseService
        .getOutstandingCourse()
        .pipe(map((res) => res.data))
        .subscribe((data: Course[]) => {
          this.outStandingCourses = [...data];
        });
    } else {
      const currentUser: User = JSON.parse(localStorage.getItem('auth')).user;
      this.courseService
        .getStudiedCourse(currentUser.HashCode)
        .pipe(map((res) => res.data))
        .subscribe({
          next: (data: Course[]) => {
            this.loadedCourses = [...data];
            this.courseService
              .getOutstandingCourse()
              .pipe(map((res) => res.data))
              .subscribe((data: Course[]) => {
                this.outStandingCourses = [...data];
                this.loadedCourses.forEach((studiedCourse: Course) => {
                  this.outStandingCourses.forEach((course: Course, index) => {
                    if (studiedCourse.hashCode === course.hashCode) {
                      this.outStandingCourses.splice(index, 1);
                    }
                  });
                });
              });
          },
          error: () => {
            this.courseService
              .getOutstandingCourse()
              .pipe(map((res) => res.data))
              .subscribe((data: Course[]) => {
                this.outStandingCourses = [...data];
              });
          },
        });
    }
  }
}
