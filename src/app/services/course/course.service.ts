import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService implements OnInit {
  BASE_URL = 'https://localhost:5001/api/1.0';
  DELETE_COURSE_API =
    'https://localhost:5001/api/1.0/Course/deletecourse?courseHashCode=';
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}
  getAllCourse() {
    return this.http.get<any>(`${this.BASE_URL}/Course/get-all-course?page=1`);
  }
  getCourseByHashcode(hashCode: string) {
    return this.http.get<any>(
      `${this.BASE_URL}/Course/get-course-by-hashcode?hashCode=${hashCode}`
    );
  }
  getStudiedCourse(hashCode: string) {
    return this.http.get<any>(
      `${this.BASE_URL}/Course/get-studied-course?hashCodeUser=${hashCode}&page=1`
    );
  }
  getOutstandingCourse() {
    return this.http.get<any>(`${this.BASE_URL}/Course/get-outstanding-course`);
  }
  enrollFreeCourse(userHashCode: string, courseHashCode: string) {
    return this.http.post(`${this.BASE_URL}/Enroll/enroll-free-course`, {
      userHashCode: userHashCode,
      courseHashCode: courseHashCode,
    });
  }

  deleteCourse(hashCode: string) {
    return this.http.delete<any>(this.DELETE_COURSE_API + hashCode);
  }
}
