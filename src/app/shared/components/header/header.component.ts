import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  inputValue: string = '';
  helper = new JwtHelperService();
  isLoggedIn: boolean = false;
  avatarLink: string = 'https://localhost:5001/avatars/';
  isDisplayed: boolean = false;
  userHashcode: string = '';
  role: string = '';
  username: string = '';

  constructor(
    private _router: Router, 
    private _auth: AuthService) { }

  ngOnInit(): void {
    this.checkLogin();
  }
  sendSearchValue($event: KeyboardEvent) {
    if($event.key === 'Enter') {
      this._router.navigate([ '/search/results' ], { queryParams: { nameCourse: this.inputValue } });
    }
  }
  
  checkLogin() {
    this.isLoggedIn = this._auth.isAuthenticated();
    if(this.isLoggedIn) {
      const user = this._auth.getUserInfo();
      this.avatarLink += user.Avatar;
      this.username = user.FullName;
      this.role = user.role;
      this.userHashcode = user.HashCode;
    }
  }
  
  toggle() {
    this.isDisplayed = !this.isDisplayed;
  }
  
  moveToLogin() {
    let redirectUrl = this._router.routerState.snapshot.url;
    this._router.navigate([ 'user/login' ], { queryParams: { redirectUrl: redirectUrl } });
  }

  moveToInstructorDashboard(){
    this._router.navigate(['instructor/dashboard'], { queryParams: { id: this.userHashcode } })
  }

  
}
