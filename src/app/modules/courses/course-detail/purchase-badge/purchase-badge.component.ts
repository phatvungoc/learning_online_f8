import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import { Course } from 'src/app/shared/models/course.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-purchase-badge',
  templateUrl: './purchase-badge.component.html',
  styleUrls: ['./purchase-badge.component.scss'],
})
export class PurchaseBadgeComponent implements OnInit {
  isAuthenticated: boolean;

  @Input() courseHashCode: string;
  isStudied: boolean = false;
  @Input() image: string;
  @Input() totalLesson: number;
  @Input() totalTime: number[];

  constructor(
    private router: Router,
    private courseService: CourseService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.auth.isAuthenticated();

    if (this.isAuthenticated) {
      const currentUser: User = JSON.parse(localStorage.getItem('auth')).user;
      this.courseService
        .getStudiedCourse(currentUser.HashCode)
        .pipe(map((res) => res.data))
        .subscribe({
          next: (courses: Course[]) => {
            courses.forEach((course: Course) => {
              if (course.hashCode === this.courseHashCode) {
                this.isStudied = true;
              }
            });
          },
          error: () => {},
        });
    }
  }

  onEnrollFreeCourse() {
    if (!this.isAuthenticated) {
      this.router.navigate(['/user/login']);
    } else {
      const currentUser: User = JSON.parse(localStorage.getItem('auth')).user;
      this.courseService
        .enrollFreeCourse(currentUser.HashCode, this.courseHashCode)
        .pipe(map((res) => res['statusCode']))
        .subscribe((statusCode) => {
          if (statusCode) {
            this.router.navigate(['/learning', this.courseHashCode]);
          }
        });
    }
  }
}
