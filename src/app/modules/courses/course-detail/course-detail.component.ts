import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import { Course } from 'src/app/shared/models/course.model';
import { Lesson } from 'src/app/shared/models/lesson.model';
import { Section } from 'src/app/shared/models/section.model';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  currentUser: User;
  statusCode: number;

  courseHashCode: string = '';
  loadedData: any = '';
  sections: Section[] = [];
  lessons: Lesson[] = [];
  totalLesson: number;
  totalTime: number[] = [];
  showAll: boolean = false;
  showList: boolean[] = [];
  purchaseInfo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private courseService: CourseService,
    private elementRef: ElementRef,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('auth')).user;
    this.courseHashCode = this.route.snapshot.params['hashCode'];
    this.courseService
      .getCourseByHashcode(this.courseHashCode)
      .pipe(map((res) => res.data))
      .subscribe((data: Course) => {
        this.loadedData = { ...data };
        this.sections = this.loadedData.sections;
        this.sections.forEach((section: Section) => {
          this.lessons = this.lessons.concat(section['lessions']);
          this.showList.push(false);
        });
        this.totalLesson = this.lessons.length;
        this.showList[0] = true;
        let totalTime = 0;
        this.lessons.forEach((lesson) => {
          const duration = lesson.duration.split(':');
          totalTime += +duration[1] * 60 + +duration[2];
        });

        this.totalTime.push(Math.floor(totalTime / 3600));
        this.totalTime.push(
          Math.floor((totalTime / 3600 - Math.floor(totalTime / 3600)) * 60)
        );
      });
  }

  onToggleAll() {
    if (this.showAll) {
      this.onSetAllValue(false);
    } else {
      this.onSetAllValue(true);
    }
    this.showAll = !this.showAll;
  }

  onSetAllValue(value: boolean) {
    for (var i = 0; i < this.showList.length; i++) {
      this.showList[i] = value;
    }
  }

  onToggleIndex(index: number) {
    this.showList[index] = !this.showList[index];
    const len = this.showList.length;
    let showCount = 0;
    for (var i = 0; i < len; i++) {
      if (this.showList[i] === true) {
        showCount += 1;
      }
    }
    if (showCount === len) {
      this.showAll = true;
    } else this.showAll = false;
  }
}
