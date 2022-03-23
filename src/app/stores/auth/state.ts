import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Login, LoginFailed, LoginSuccess, Logout } from './actions';
import { IAuthStateModel } from './models';

const helper = new JwtHelperService();

@State<IAuthStateModel>({
  name: 'auth',
})
@Injectable()
export class AuthState {
  @Selector()
  static token(state: IAuthStateModel) {
    return state.token;
  }

  @Selector()
  static userInfo(state: IAuthStateModel) {
    return { ...state };
  }

  constructor(private authService: AuthService) {}

  @Action(LoginSuccess)
  loginSuccess(
    { patchState }: StateContext<IAuthStateModel>,
    { payload }: LoginSuccess
  ) {
    const decodedToken = helper.decodeToken(payload);
    patchState({
      user: { ...decodedToken },
      token: payload,
      error: null,
    });
  }

  @Action(LoginFailed)
  loginFailed(
    { patchState }: StateContext<IAuthStateModel>,
    { error }: LoginFailed
  ) {
    patchState({
      user: {},
      token: null,
      error: error,
    });
  }

  @Action(Login)
  login({ dispatch }: StateContext<IAuthStateModel>, { payload }: Login) {
    return this.authService.login(payload).pipe(
      tap((data) => {
        return dispatch(new LoginSuccess(data));
      }),
      catchError((error) => {
        return dispatch(new LoginFailed(error));
      })
    );
  }

  @Action(Logout)
  logout({ setState }: StateContext<IAuthStateModel>) {
    return this.authService.logout().pipe(
      tap(() => {
        setState({
          user: {},
          token: null,
          error: null,
        });
      })
    );
  }
}
