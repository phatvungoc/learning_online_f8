import {
  AnswerModel,
  AnswerResponseModel,
  QuestionModel,
  QuestionResponseModel,
  QuizModel,
  QuizResponseModel,
} from './models';

// Question
export class GetQuestionByQuiz {
  static readonly type = '[Question] Get Question By Quiz';
  constructor(public payload: string | null | undefined) {}
}

export class GetQuestionByQuizSuccess {
  static readonly type = '[Question] Get Question By Quiz Success';
  constructor(public payload: QuestionResponseModel) {}
}

export class GetQuestionByQuizFail {
  static readonly type = '[Question] Get Question By Quiz Failed';
  constructor(public payload: string) {}
}

// Quiz
export class GetQuizByLession {
  static readonly type = '[Quiz] Get Quiz By Lession';
  constructor(public payload: string | null) {}
}

export class GetQuizByLessionSuccess {
  static readonly type = '[Quiz] Get Quiz By Lession Success';
  constructor(public payload: QuizResponseModel) {}
}

export class GetQuizByLessionFail {
  static readonly type = '[Quiz] Get Quiz By Lession Failed';
  constructor(public payload: string) {}
}

//Answer
export class GetAnswerByQuestion {
  static readonly type = '[Answer] Get Answer By Question';
  constructor(public payload: string | null | undefined) {}
}

export class GetAnswerByQuestionSuccess {
  static readonly type = '[Answer] Get Answer By Question Success';
  constructor(public payload: AnswerResponseModel) {}
}

export class GetAnswerByQuestionFail {
  static readonly type = '[Answer] Get Answer By Question Failed';
  constructor(public payload: string) {}
}
