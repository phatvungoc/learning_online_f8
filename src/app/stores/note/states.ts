import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { catchError, tap } from 'rxjs/operators';
import { NoteService } from 'src/app/services/note/note.service';

import {
  GetNoteByLession,
  GetNoteByLessionFail,
  GetNoteByLessionSuccess,
} from './actions';
import { NoteModel, NoteResponseModel } from './models';

@State<NoteResponseModel>({
  name: 'note',
  defaults: {},
})
@Injectable()
export class NoteState {
  constructor(private _apiService: NoteService) {}

  @Action(GetNoteByLession)
  getNote(
    { dispatch, setState }: StateContext<NoteModel>,
    { payload1, payload2 }: GetNoteByLession
  ) {
    return this._apiService.getNoteByLession(payload1, payload2).pipe(
      tap((res: any) => {
        if (res) {
          setState(res.data);
          dispatch(new GetNoteByLessionSuccess(res));
        } else {
          dispatch(new GetNoteByLessionFail('Note not being loaded..'));
        }
      }),
      catchError((err) => err)
    );
  }

  @Selector()
  static getNoteState(note: NoteModel) {
    return note;
  }
}
