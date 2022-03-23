export class StoreDisplayedComponent {
  static readonly type = '[StudentDashboard] StoreDisplayedComponent';
  constructor(public payload: string) {}
}

export class StoreStudentHashCode {
  static readonly type = '[StudentDashboard] StoreStudentHashCode';
  constructor(public payload: string) {}
}

export class StoreStudent {
  static readonly type = '[StudentDashboard] StoreStudent';
  constructor(public payload: any) {}
}
