import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  StoreDisplayedComponent,
  StoreStudent,
  StoreStudentHashCode,
} from './actions';
import { IStudentDashboardStateModel } from './models';

@State<IStudentDashboardStateModel>({
  name: 'studentDashboard',
  defaults: {
    displayedComponent: '',
    studentHashCode: '',
    student: {},
  },
})
@Injectable()
export class StudentDashboardState {
  @Selector()
  static getDisplayedComponent(state: IStudentDashboardStateModel) {
    return state.displayedComponent;
  }

  @Selector()
  static getStudentHashCode(state: IStudentDashboardStateModel) {
    return state.studentHashCode;
  }

  @Selector()
  static getStudent(state: IStudentDashboardStateModel) {
    return state.student;
  }

  @Action(StoreDisplayedComponent)
  storeDisplayComponent(
    { patchState }: StateContext<IStudentDashboardStateModel>,
    { payload }: StoreDisplayedComponent
  ) {
    patchState({
      displayedComponent: payload,
    });
  }

  @Action(StoreStudentHashCode)
  storeStudentHashCode(
    { patchState }: StateContext<IStudentDashboardStateModel>,
    { payload }: StoreStudentHashCode
  ) {
    patchState({
      studentHashCode: payload,
    });
  }

  @Action(StoreStudent)
  storeStudent(
    { patchState }: StateContext<IStudentDashboardStateModel>,
    { payload }: StoreStudent
  ) {
    patchState({
      student: { ...payload },
    });
  }
}
