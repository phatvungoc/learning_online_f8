export class StoreDisplayedComponent {
  static readonly type = '[CourseDashboard] StoreDisplayedComponent';
  constructor(public payload: string) {}
}

export class StoreCourseHashCode {
  static readonly type = '[CourseDashboard] StoreCourseHashCode';
  constructor(public payload: string) {}
}

export class StoreCourse {
  static readonly type = '[CourseDashboard] StoreCourse';
  constructor(public payload: any) {}
}
