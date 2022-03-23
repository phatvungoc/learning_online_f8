import { UserDetailModel } from './models';

// User Detail
export class GetUserDetail {
  static readonly type = '[User Detail] Get User Detail';
  constructor(public payload: string) {}
}

export class GetUserDetailSuccess {
  static readonly type = '[User Detail] Get User Detail Success';
  constructor(public payload: UserDetailModel) {}
}

export class GetUserDetailFail {
  static readonly type = '[User Detail] Get User Detail Failed';
  constructor(public payload: string) {}
}
