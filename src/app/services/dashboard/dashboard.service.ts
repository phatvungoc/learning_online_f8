import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IAdminDashboard, ICourse, IUser } from './models';

const ADMIN_API_URL = 'https://localhost:5001/api/1.0/Admin/';
const COURSE_API_URL = 'https://localhost:5001/api/1.0/Course/';

const GET_ADMIN_DASHBOARD_API_URL = `${ADMIN_API_URL}getdatadashboard`;
const GET_USER_LIST_API_URL = `${ADMIN_API_URL}user-list?page=1`;
const GET_USER_DETAILS_API_URL = `${ADMIN_API_URL}user-detail?userHashCode=`;
const UPDATE_USER_INLINE_API_URL = `${ADMIN_API_URL}update-user-inline?userHashCode=`;

const GET_COURSE_LIST_API_URL = `${COURSE_API_URL}get-all-course?page=1`;

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getAdminDashboard(): Observable<IAdminDashboard> {
    return this.http.get<any>(GET_ADMIN_DASHBOARD_API_URL).pipe(
      map((result) => result.data),
      catchError((err) => throwError(() => err))
    );
  }

  getUserList(): Observable<Array<IUser>> {
    return this.http.get<any>(GET_USER_LIST_API_URL).pipe(
      map((result) =>
        result.data.sort((a: IUser, b: IUser) => {
          const firstNameA = a.firstName.toLowerCase();
          const firstNameB = b.firstName.toLowerCase();
          if (firstNameA < firstNameB) return -1;
          if (firstNameA > firstNameB) return 1;
          return 0;
        })
      ),
      catchError((err) => throwError(() => err))
    );
  }

  getUserDetails(hashCode: string): Observable<any> {
    const url = GET_USER_DETAILS_API_URL + hashCode;
    return this.http.get<any>(url).pipe(
      map((result) => result.data),
      catchError((err) => throwError(() => err))
    );
  }

  updateUserInline(hashCode: string, userInline: any): Observable<any> {
    const url = UPDATE_USER_INLINE_API_URL + hashCode;
    return this.http.put<any>(url, userInline).pipe(
      map((result) => result.message),
      catchError((err) => throwError(() => err))
    );
  }

  getCourseList(): Observable<Array<ICourse>> {
    return this.http.get<any>(GET_COURSE_LIST_API_URL).pipe(
      map((result) =>
        result.data.sort((a: ICourse, b: ICourse) => {
          const titleA = a.title.toLowerCase();
          const titleB = b.title.toLowerCase();
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        })
      ),
      catchError((err) => throwError(() => err))
    );
  }
}
