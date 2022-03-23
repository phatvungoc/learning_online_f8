import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private _http: HttpClient) { }

  createCourse() {
    return this._http.get
  }
}
