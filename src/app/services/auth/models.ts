export interface IRegisterInfo {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export interface IResult {
  data: string;
  message: string;
  statusCode: number;
}
