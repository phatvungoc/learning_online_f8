import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardAdminGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      this._auth.isAuthenticated() &&
      this._auth.getUserInfo().role === 'Admin'
    ) {
      return true;
    } else {
      this._router.navigate(['/']);
      window.alert(
        'Vui lòng đăng nhập bằng quyền Quản trị viên để có thể truy cập trang.'
      );
      return false;
    }
  }
}
