export interface ILoginInfo {
  username: string;
  password: string;
}

export interface IAuthStateModel {
  user: {};
  token: string | null;
  error: {} | null;
}
