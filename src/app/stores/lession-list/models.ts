export interface LessionModel {
    title?: string;
    duration?: string;
    link?: string;
    status?: number;
    priority?: number;
    hashCode?: string;
}

export interface SectionModel {
    title?: string;
    priority?: number;
    lessions?: LessionModel[];
    hashCode?: string;
}

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

export interface QuizLessionModel {
    data?: [
        hashCodeLession?: string,
        lessionTitle?: string,
        title?: string,
        questions?: null,
        hashCode?: string
    ];
    message?: string | null;
    statusCode?: number;
}