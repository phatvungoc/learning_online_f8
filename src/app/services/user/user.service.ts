import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from './models';

const GET_USER_API_URL =
  'https://localhost:5001/api/1.0/Admin/user-detail?userHashCode=';
const UPDATE_USER_API_URL =
  'https://localhost:5001/api/1.0/Admin/update-user?userHashCode=';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(userHashCode: string): Observable<any> {
    const url = GET_USER_API_URL + userHashCode;
    return this.http.get<any>(url).pipe(
      map((result) => result.data),
      catchError((err) => throwError(() => err))
    );
  }

  updateUser(userhashCode: string, user: User): Observable<any> {
    const url = UPDATE_USER_API_URL + userhashCode;
    return this.http.put<any>(url, user).pipe(
      map((result) => result.message),
      catchError((err) => throwError(() => err))
    );
  }
}
