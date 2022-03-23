import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap, map } from 'rxjs/operators';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import {
  GetAnswerByQuestion,
  GetAnswerByQuestionFail,
  GetAnswerByQuestionSuccess,
  GetQuestionByQuiz,
  GetQuestionByQuizFail,
  GetQuestionByQuizSuccess,
  GetQuizByLession,
  GetQuizByLessionFail,
  GetQuizByLessionSuccess,
} from './actions';
import {
  AnswerModel,
  AnswerResponseModel,
  QuestionModel,
  QuestionResponseModel,
  QuizModel,
  QuizResponseModel,
} from './models';

@State<QuizResponseModel>({
  name: 'quiz',
  defaults: {},
})
@Injectable()
export class QuizState {
  constructor(private _apiService: QuizService) {}

  @Action(GetQuizByLession)
  getQuizByLession(
    { dispatch }: StateContext<QuizModel>,
    { payload }: GetQuizByLession
  ) {
    return this._apiService.getQuizByLession(payload).pipe(
      tap((res: any) => {
        if (res) {
          // setState(res.data);
          dispatch(new GetQuizByLessionSuccess(res.data));
        } else {
          dispatch(new GetQuizByLessionFail('Quiz not being loaded..'));
        }
      }),
      catchError((err) => err)
    );
  }

  @Action(GetQuizByLessionSuccess)
  getQuizByLessionSuccess(
    { setState }: StateContext<QuizResponseModel>,
    { payload }: GetQuizByLessionSuccess
  ) {
    setState(payload);
  }

  @Selector()
  static getQuizByLesssionState(quiz: QuizModel) {
    return quiz;
  }
}

@State<QuestionResponseModel>({
  name: 'question',
})
@Injectable()
export class QuestionState {
  constructor(private _apiService: QuizService) {}

  @Action(GetQuestionByQuiz)
  getQuestionByQuiz(
    { dispatch }: StateContext<QuestionModel>,
    { payload }: GetQuestionByQuiz
  ) {
    return this._apiService.getQuestionByQuiz(payload).pipe(
      tap((res: any) => {
        if (res) {
          dispatch(new GetQuestionByQuizSuccess(res.data));
        } else {
          dispatch(
            new GetQuestionByQuizFail('Course Detail not being loaded..')
          );
        }
      }),
      catchError((err) => err)
    );
  }

  @Action(GetQuestionByQuizSuccess)
  getQuestionByQuizSuccess(
    { setState }: StateContext<QuestionResponseModel>,
    { payload }: GetQuestionByQuizSuccess
  ) {
    setState(payload);
  }

  @Selector()
  static getQuestionByQuizState(question: QuestionModel) {
    return question;
  }
}

@State<AnswerResponseModel>({
  name: 'answer',
  defaults: {},
})
@Injectable()
export class AnswerState {
  constructor(private _apiService: QuizService) {}

  @Action(GetAnswerByQuestion)
  getAnswerByQuestion(
    { dispatch }: StateContext<AnswerModel>,
    { payload }: GetAnswerByQuestion
  ) {
    return this._apiService.getAnswerByQuestion(payload).pipe(
      tap((res: any) => {
        if (res) {
          dispatch(new GetAnswerByQuestionSuccess(res.data));
        } else {
          dispatch(new GetAnswerByQuestionFail('Answer not being loaded..'));
        }
      }),
      catchError((err) => err)
    );
  }

  @Action(GetAnswerByQuestionSuccess)
  getQuestionByQuizSuccess(
    { setState }: StateContext<AnswerResponseModel>,
    { payload }: GetAnswerByQuestionSuccess
  ) {
    setState(payload);
  }

  @Selector()
  static getAnswerByQuestionState(answer: AnswerModel) {
    return answer;
  }
}
