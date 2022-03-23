export interface IAdminDashboard {
  courseCount: number;
  instructorCount: number;
  courseApprove: number;
  participantCount: number;
}

export interface IUser {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  loginAt: string;
  role: number;
  status: number;
  hashCode: string;
}

export interface IUserInline {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  role: number;
  status: number;
}

export interface ICourse {
  title: string;
  image: string;
  totalStudent: number;
  hashCode: string;
}

export interface ICourseDetails {
  title: string;
  instructorHashCode: string;
  image: string;
  description: string;
  level: string;
  isPayment: string;
  price: string;
  categoryHashCode: string;
}
