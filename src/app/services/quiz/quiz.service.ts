import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetailResponseModel } from 'src/app/stores/overview/models';
import {
  AnswerResponseModel,
  CourseResponseModel,
  QuestionResponseModel,
  QuizResponseModel,
} from 'src/app/stores/quiz/models';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  COURSE_BY_HASHCODE_API =
    'https://localhost:5001/api/1.0/Course/get-course-by-hashcode?hashCode=53a097b2-6070-4773-a879-ad80f73305f1';
  QUIZ_API =
    'https://localhost:5001/api/1.0/Quiz/get-by-lession?hashCodeLession=c7d1c2f1-35f3-4fbe-9e35-bb91a4adfda4';
  QUESTION_API =
    'https://localhost:5001/api/1.0/Question/get-by-quiz?hashCodeQuiz=32ed2175-eef4-4714-8ce1-af6b48e5323c';
  ANSWER_API =
    'https://localhost:5001/api/1.0/Answer/get-by-question?hashCodeQuestion=376f3fec-7187-4583-b456-c789419d5512';
  USER_DETAIL_API =
    'https://localhost:5001/api/1.0/Admin/user-detail?userHashCode=32a3384a-92d4-45f7-bf2f-a3457dfc08da';
  LESSION_API =
    'https://localhost:5001/api/1.0/Lession/detail?lessionHashCode=49feaadb-b2cc-4116-a7e7-6310076fb378&userHashCode=32a3384a-92d4-45f7-bf2f-a3457dfc08da';

  constructor(private _http: HttpClient) {}
  getQuizByLession(hascodeLession: string | null) {
    return this._http.get<QuizResponseModel>(
      `https://localhost:5001/api/1.0/Quiz/get-by-lession?hashCodeLession=${hascodeLession}`
    );
  }
  getQuestionByQuiz(hashCodeQuiz: string | null | undefined) {
    return this._http.get<QuestionResponseModel>(
      `https://localhost:5001/api/1.0/Question/get-by-quiz?hashCodeQuiz=${hashCodeQuiz}`
    );
  }
  getAnswerByQuestion(hashCodeQuestion: string | null | undefined) {
    return this._http.get<AnswerResponseModel>(
      `https://localhost:5001/api/1.0/Answer/get-by-question?hashCodeQuestion=${hashCodeQuestion}`
    );
  }
  getCourseDetailByHashCode() {
    return this._http.get<CourseResponseModel>(this.COURSE_BY_HASHCODE_API);
  }
  getLessionsByHashCode(lessionHashCode: string, userHashCode: string) {
    return this._http.get(
      `https://localhost:5001/api/1.0/Lession/detail?lessionHashCode=${lessionHashCode}&userHashCode=${userHashCode}`
    );
  }
  getUserDetailByHashCode(hashCodeUser: string) {
    return this._http.get<UserDetailResponseModel>(
      `https://localhost:5001/api/1.0/Admin/user-detail?userHashCode=${hashCodeUser}`
    );
  }
  postQuizUser(quizHashCode: string, userHashCode: string) {
    return this._http.post(
      'https://localhost:5001/api/1.0/QuizUser/addquizuser',
      {
        hashCodeUser: userHashCode,
        hashCodeQuiz: quizHashCode,
        score: 50,
      }
    );
  }
}
