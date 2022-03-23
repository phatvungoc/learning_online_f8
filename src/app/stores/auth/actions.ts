export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { username: string; password: string }) {}
}

export class LoginSuccess {
  static type = '[Auth] LoginSuccess';
  constructor(public payload: string) {}
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';
  constructor(public error: any) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class LogoutSuccess {
  static type = '[Auth] LogoutSuccess';
}
