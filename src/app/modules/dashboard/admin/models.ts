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

export interface ICourse {
  title: string;
  image: string;
  totalStudent: number;
  hashCode: string;
}

export interface ICourseDetails {
  title: string;
  image: string;
  totalStudent: number;
  description: string;
  totalLession: number;
  totalTime: string;
  level: number;
  sections: Array<any>;
  descriptionDetails: Array<any>;
  hashCode: string;
}

export interface IAdminDashboard {
  courseCount: number;
  instructorCount: number;
  courseApprove: number;
  participantCount: number;
}
