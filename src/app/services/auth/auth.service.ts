import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { IRegisterInfo } from './models';

const LOGIN_API_URL = 'https://localhost:5001/api/1.0/Authentication/login';
const REGISTER_API_URL = 'https://localhost:5001/api/1.0/Authentication/register';
const USER_DETAIL_URL = 'https://localhost:5001/api/1.0/Admin/user-detail?userHashCode=';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(user: { username: string; password: string }): Observable<string> {
    return this.http
      .post<any>(LOGIN_API_URL, user)
      .pipe(map((result) => result.data));
  }

  logout(): Observable<null> {
    return of(null);
  }

  register(registerInfo: IRegisterInfo): Observable<any> {
    const fd = new FormData();
    fd.append('Email', registerInfo.email);
    fd.append('FirstName', registerInfo.firstName);
    fd.append('LastName', registerInfo.lastName);
    fd.append('PhoneNumber', registerInfo.phoneNumber);
    fd.append('PasswordHash', registerInfo.password);
    fd.append('ConfirmPassword', registerInfo.confirmPassword);
    fd.append(
      'Bio',
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Praesent sodales, leo id mollis euismod, enim tortor eleifend leo, 
      suscipit mollis nibh est quis nisi. Fusce laoreet finibus finibus. 
      Mauris felis enim, blandit id mi a, lacinia placerat magna. 
      Aliquam aliquam quam vel diam blandit, id maximus dui blandit.`
    );
    return this.http
      .post<any>(REGISTER_API_URL, fd)
      .pipe(catchError((error) => throwError(() => error)));
  }

  isAuthenticated() {
    if(!localStorage.getItem('auth')) {
      return false;
    };
    const { token } = JSON.parse(localStorage.getItem('auth'));
    const isAuth = helper.isTokenExpired(token) ? false : true;
    return isAuth;
  }

  getUserInfo() {
    const { user } = JSON.parse(localStorage.getItem('auth'));
    return user;
  };

  isInstructor() {
    if(!localStorage.getItem('auth')) {
      return false;
    };
    const { user } = JSON.parse(localStorage.getItem('auth'));
    const isRight = user.role === 'Instructor' ? true : false;
    return isRight;
  }

  getUserDetail(userHashCode: string) {
    return this.http.get<any>(USER_DETAIL_URL + userHashCode);
  }
}
