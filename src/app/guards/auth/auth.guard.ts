import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this._auth.isAuthenticated()) {
      return true;
    }else {
      this._router.navigate(['/user/login'], { queryParams: { redirectUrl: state.url} });
      window.alert('Bạn chưa đăng nhập. Vui lòng đăng nhập để thực hiện chức năng này.');
      return false;
    }
  }
  
}
