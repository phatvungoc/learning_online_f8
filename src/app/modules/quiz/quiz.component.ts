import { Component, OnInit, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { Router } from '@angular/router';
import {
  AnswerModel,
  QuestionModel,
  QuizModel,
} from 'src/app/stores/quiz/models';
import {
  AnswerState,
  QuestionState,
  QuizState,
} from 'src/app/stores/quiz/states';
import {
  GetAnswerByQuestion,
  GetQuestionByQuiz,
  GetQuizByLession,
} from 'src/app/stores/quiz/actions';
import { ActivatedRoute, Params } from '@angular/router';
import { QuizService } from 'src/app/services/quiz/quiz.service';
import { User } from 'src/app/services/user/models';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  constructor(
    private _store: Store,
    private _route: ActivatedRoute,
    private _router: Router,
    private quizApi: QuizService
  ) {}

  isVideoEnabled = false;
  isPassedQuestion = false;

  quiz!: QuizModel | any;
  quizs!: QuizModel[];
  @Select(QuizState.getQuizByLesssionState)
  quizs$!: Observable<QuizModel[]>;

  question!: QuestionModel;
  @Select(QuestionState.getQuestionByQuizState)
  question$!: Observable<QuestionModel[]>;

  answers!: AnswerModel[];
  @Select(AnswerState.getAnswerByQuestionState)
  answer$!: Observable<AnswerModel[]>;

  @ViewChildren('answer') answerChoosen: any;
  lessionHashCode: string | null = '';
  quizHashCode: any = '';
  questionHashCode: string | null = '';

  userHashCode: string = '';

  quizChosenId: number = 0;
  isPassed: boolean = false;
  correctAnswer: AnswerModel[] = [];
  quizHashCodeArr: string[] = [];
  checkQuizArr: string[] =
    JSON.parse(localStorage.getItem('checkQuizArr')!) || [];

  userPassedQuiz: any;

  ngOnInit(): void {
    const currentUser: User = JSON.parse(localStorage.getItem('auth')).user;
    this.userHashCode = currentUser['HashCode'];
    this.userPassedQuiz = JSON.parse(
      localStorage.getItem('userPassedQuiz')!
    ) || {
      userHashCode: this.userHashCode,
      quizsPassedHashCode: [],
      quizsAnswerPassedHashCode: [],
    };
    this._route.queryParamMap.subscribe((params) => {
      this.lessionHashCode = params.get('hashCodeLession');
      this.quizHashCode = params.get('hashCodeQuiz');
    });
    this.getQuizByLession(this.lessionHashCode);
    this.quizs$.subscribe((quizs: QuizModel[]) => {
      this.quizs = quizs;
      this.quiz = this.quizs.find((q) => q.hashCode == this.quizHashCode);
    });
    this.getQuestionByQuiz(this.quizHashCode);
    this.question$.subscribe((questions) => {
      this.question = questions[0];
      this.questionHashCode = questions[0].hashCode;
      this.getAnswerByQuestion(this.questionHashCode);
      this.answer$.subscribe((answers) => {
        this.answers = answers;
        this.correctAnswer = answers.filter(
          (item: AnswerModel) => item.isTrue == true
        );
      });
    });
  }

  getQuestionByQuiz(hashCode: string | null | undefined) {
    this._store.dispatch(new GetQuestionByQuiz(hashCode));
  }

  getQuizByLession(hashCode: string | null) {
    this._store.dispatch(new GetQuizByLession(hashCode));
  }

  async getAnswerByQuestion(hashCode: string | null | undefined) {
    this._store.dispatch(new GetAnswerByQuestion(hashCode));
  }

  handleChooseQuiz(hashCode: string) {
    this._router.navigate(['/quiz'], {
      queryParams: {
        hashCodeLession: this.lessionHashCode,
        hashCodeQuiz: hashCode,
      },
    });
    this.quizHashCode = hashCode;
    this.quiz = this.quizs.find((q) => q.hashCode == hashCode);
    this.getQuestionByQuiz(this.quizHashCode);
    this.question$.subscribe((questions) => {
      this.question = questions[0];
      this.questionHashCode = this.question.hashCode;
    });
    this.getAnswerByQuestion(this.questionHashCode);
    this.answer$.subscribe((answers) => {
      this.answers = answers;
    });
    console.log(this.quiz);
  }

  handlePassedQuiz(quizs: QuizModel[]) {
    this.userPassedQuiz.quizsPassedHashCode.push(this.quizHashCode);
    this.correctAnswer.forEach((item) => {
      this.userPassedQuiz.quizsAnswerPassedHashCode.push(item.hashCode);
    });
    localStorage.setItem('userPassedQuiz', JSON.stringify(this.userPassedQuiz));
    this.quizChosenId = quizs.map((q) => q.hashCode).indexOf(this.quizHashCode);
    this.quizChosenId =
      this.quizChosenId < this.quizs.length - 1
        ? this.quizChosenId + 1
        : this.quizs.length - 1;
    this.quizHashCode = this.quizs[this.quizChosenId].hashCode;
    this.getQuestionByQuiz(this.quizHashCode);
    this.question$.subscribe((questions) => {
      this.question = questions[0];
      this.questionHashCode = this.question.hashCode;
    });
    this.getAnswerByQuestion(this.questionHashCode);
    this.answer$.subscribe((answers) => {
      this.answers = answers;
    });

    this.quizChosenId =
      this.quizChosenId < this.quizs.length - 1
        ? this.quizChosenId + 1
        : this.quizs.length - 1;
  }

  handleSubmitAnswer(quizs: Array<QuizModel>) {
    const newArrAnswerChosen: AnswerModel[] = [];
    for (let answer of this.answerChoosen) {
      if (answer.nativeElement.checked) {
        const answerText = answer.nativeElement.value;
        newArrAnswerChosen.push(this.answers[answerText]);
      }
    }
    if (newArrAnswerChosen.length > 0) {
      if (
        JSON.stringify(this.correctAnswer) == JSON.stringify(newArrAnswerChosen)
      ) {
        alert(`B???n ???? v?????t qua b??i t???p n??y !!!`);
        this.quizApi
          .postQuizUser(this.quizHashCode, this.userHashCode)
          .subscribe(
            (res) => {
              console.log(res);
            },
            (error) => {
              console.log(error);
            }
          );
        this.handlePassedQuiz(quizs);
      } else {
        alert(`????p ??n c???a b???n ch??a ch??nh x??c !!!`);
      }
    } else {
      alert('Vui l??ng nh???p ????p ??n c???a b???n !!!');
    }
  }

  funcCheck(value: AnswerModel) {
    return this.userPassedQuiz.quizsAnswerPassedHashCode.includes(
      value.hashCode
    )
      ? true
      : false;
  }
}
