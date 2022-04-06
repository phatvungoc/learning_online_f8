import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs/operators';
import { SearchCourse } from 'src/app/modules/search/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/course/course.service';
import { ApiService } from 'src/app/services/search/api.service';

@Component({
  selector: 'app-total-course',
  templateUrl: './total-course.component.html',
  styleUrls: ['./total-course.component.scss'],
})
export class TotalCourseComponent implements OnInit {
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _api: ApiService,
    private _auth: AuthService,
    private _course: CourseService,
    private _router: Router
  ) {}
  toggleModal: boolean = false;
  courseHashCode: string;
  index: number;
  instructorHashCode: string = '';
  coursesList: SearchCourse[];
  courseUpdatedData: any;
  ngOnInit(): void {
    this._activatedRoute.queryParamMap
      .pipe(
        concatMap((resp) => {
          this.instructorHashCode = resp.get('id');
          return this._auth.getUserDetail(this.instructorHashCode);
        })
      )
      .pipe(
        concatMap((resp) => {
          const instructorFirstName = resp.data.firstName;
          return this._api.searchByInstructorName(instructorFirstName);
        })
      )
      .subscribe((resp) => {
        this.coursesList = resp.data;
      });
  }
  removeCourse(courseHashCode: string) {
    if (confirm('bạn có muốn xóa khóa học này') == true) {
      this._course.deleteCourse(courseHashCode).subscribe((resp) => {
        alert(resp.message);
        this.coursesList.find((item, index) => {
          if (item?.hashCode === courseHashCode) {
            this.coursesList.splice(index, 1);
          }
        });
      });
    }
  }
  editCourse(courseHashCode: string, index: number) {
    this.courseHashCode = courseHashCode;
    this.index = index;
    this.toggleModal = true;
  }
  getUpdatedData($event: any) {
    this.coursesList.forEach((item, index) => {
      if (index === $event.index) {
        item.title = $event.title;
        item.image = $event.image;
      }
    });
  }
  updateCourseDetail(courseHashCode: string) {
    this._router.navigate(['/instructor/update-course-detail'], {
      queryParams: { hashCode: courseHashCode },
    });
  }
}
