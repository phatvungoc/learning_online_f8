import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Course } from 'src/app/shared/models/course.model';
import { CourseService } from 'src/app/services/course/course.service';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  fakeArray = new Array(9);
  loadedCourses: Array<Course> = [];
  statusCode: number;
  outStandingCourses: Array<Course> = [];

  constructor(
    private courseService: CourseService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();

    this.courseService
      .getOutstandingCourse()
      .pipe(map((res) => res.data))
      .subscribe({
        next: (data: Course[]) => (this.outStandingCourses = [...data]),
        error: () => {},
      });

    if (this.isAuthenticated) {
      const currentUser: User = JSON.parse(localStorage.getItem('auth')).user;
      this.courseService
        .getStudiedCourse(currentUser.HashCode)
        .pipe(map((res) => res.data))
        .subscribe({
          next: (data: Course[]) => (this.loadedCourses = [...data]),
          error: () => {},
        });
    }
  }
}
