import { LessionDetailState } from './stores/general-layout/states';
import { CourseDetailState } from './stores/lession-list/states';
import { NoteState } from './stores/note/states';
import { UserDetailState } from './stores/overview/states';
import { QuizState, QuestionState, AnswerState } from './stores/quiz/states';

export const appState = [
  QuizState,
  QuestionState,
  AnswerState,
  UserDetailState,
  CourseDetailState,
  LessionDetailState,
  NoteState,
];
