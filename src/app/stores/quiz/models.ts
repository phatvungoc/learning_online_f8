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

//Question Model
export interface QuestionModel {
  content?: string;
  point?: number;
  status?: number;
  quizTitle?: string;
  hashCodeQuiz?: string;
  hashCode: string;
}

export interface QuestionResponseModel {
  data?: QuestionModel[];
  message?: string | null;
  statusCode?: number;
}

// export interface IsAnswerCorrectModel {
//   content: string;
// }

//Quiz Model
export interface QuizModel {
  hashCodeLession?: string;
  lessionTitle?: string;
  title?: string;
  questions?: any;
  hashCode: string;
}

export interface QuizResponseModel {
  data?: QuizModel[];
  message?: string | null;
  statusCode?: number;
}

// Answer Model
export interface AnswerModel {
  content?: string;
  isTrue?: boolean;
  questionTitle?: string;
  hashCodeQuestion?: string;
  hashCode?: string;
}

export interface AnswerResponseModel {
  data?: AnswerModel[];
  message?: string | null;
  statusCode?: number;
}

export interface CheckAnswerModel {
  quiz: number;
  quizHashCode: string;
  customChoose: AnswerModel[];
}
