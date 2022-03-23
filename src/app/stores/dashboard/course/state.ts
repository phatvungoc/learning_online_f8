import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  StoreCourse,
  StoreCourseHashCode,
  StoreDisplayedComponent,
} from './actions';
import { ICourseDashboardStateModel } from './models';

@State<ICourseDashboardStateModel>({
  name: 'coursetDashboard',
  defaults: {
    displayedComponent: '',
    courseHashCode: '',
    course: {},
  },
})
@Injectable()
export class CourseDashboardState {
  @Selector()
  static getDisplayedComponent(state: ICourseDashboardStateModel) {
    return state.displayedComponent;
  }

  @Selector()
  static getCourseHashCode(state: ICourseDashboardStateModel) {
    return state.courseHashCode;
  }

  @Selector()
  static getCourse(state: ICourseDashboardStateModel) {
    return state.course;
  }

  @Action(StoreDisplayedComponent)
  storeDisplayComponent(
    { patchState }: StateContext<ICourseDashboardStateModel>,
    { payload }: StoreDisplayedComponent
  ) {
    patchState({
      displayedComponent: payload,
    });
  }

  @Action(StoreCourseHashCode)
  storeCourseHashCode(
    { patchState }: StateContext<ICourseDashboardStateModel>,
    { payload }: StoreCourseHashCode
  ) {
    patchState({
      courseHashCode: payload,
    });
  }

  @Action(StoreCourse)
  storeCourse(
    { patchState }: StateContext<ICourseDashboardStateModel>,
    { payload }: StoreCourse
  ) {
    patchState({
      course: { ...payload },
    });
  }
}
