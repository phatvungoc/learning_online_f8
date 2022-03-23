// Section Model

export interface SectionModel {
  title?: string;
  description?: string;
  hashCode?: string;
  priority?: number;
}

// Course Detail Model
export interface CourseDetailModel {
  title?: string;
  image?: string;
  totalStudent?: number;
  description?: string;
  totalLession?: number;
  totalTime?: string;
  level?: number;
  sections?: SectionModel[];
  descriptionDetails?: string[];
  hasdCode?: string;
}

export interface CourseResponseModel {
  data?: CourseDetailModel;
  message?: string | null;
  statusCode?: number;
}

// User Detail Model
export interface UserDetailModel {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber: string;
  email: string;
  avatar: string;
}

export interface UserDetailResponseModel {
  data?: UserDetailModel;
  message?: string | null;
  statusCode?: number;
}
