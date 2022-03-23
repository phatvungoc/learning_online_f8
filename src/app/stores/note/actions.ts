import { NoteModel } from './models';

// Note Action
export class GetNoteByLession {
  static readonly type = '[Note] Get Note';
  constructor(public payload1: string, public payload2: string) {}
}

export class GetNoteByLessionSuccess {
  static readonly type = '[Note] Get Note Success';
  constructor(public payload: NoteModel) {}
}

export class GetNoteByLessionFail {
  static readonly type = '[Note] Get Note Failed';
  constructor(public payload: string) {}
}
