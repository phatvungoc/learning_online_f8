import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private _http: HttpClient) {}

  getNoteByLession(hashCodeLession: string, hashCodeUser: string) {
    return this._http.get(
      `https://localhost:5001/api/1.0/Note/get-by-lession?hashCodeLession=${hashCodeLession}&hashCodeUser=${hashCodeUser}`
    );
  }
  posttNote(
    hashCodeUser: string,
    hashCodeLession: string,
    content: string,
    timeLine: string
  ) {
    return this._http.post('https://localhost:5001/api/1.0/Note/add-note', {
      hashCodeUser,
      hashCodeLession,
      content,
      timeLine,
    });
  }
}
