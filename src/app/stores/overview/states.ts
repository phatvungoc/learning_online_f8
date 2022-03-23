import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { OverviewService } from 'src/app/services/overview/overview.service';
import {
  GetUserDetail,
  GetUserDetailFail,
  GetUserDetailSuccess,
} from './actions';
import { UserDetailModel, UserDetailResponseModel } from './models';

@State<UserDetailResponseModel>({
  name: 'userDetail',
  defaults: {},
})
@Injectable()
export class UserDetailState {
  constructor(private _apiService: OverviewService) {}

  @Action(GetUserDetail)
  getUserDetail(
    { dispatch, setState, patchState }: StateContext<UserDetailModel>,
    { payload }: GetUserDetail
  ) {
    return this._apiService.getUserDetailByHashCode(payload).pipe(
      tap((res: any) => {
        if (res) {
          setState(res.data);
          dispatch(new GetUserDetailSuccess(res));
        } else {
          dispatch(new GetUserDetailFail('Quiz not being loaded..'));
        }
      }),
      catchError((err) => err)
    );
  }

  @Selector()
  static getUserDetailState(userDetail: UserDetailModel) {
    return userDetail;
  }
}
