import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CourseResponseModel,
  QuizLessionModel,
} from 'src/app/stores/lession-list/models';

@Injectable({
  providedIn: 'root',
})
export class LesstionListService {
  baseURL: string = 'https://localhost:5001/api/1.0';
  userHashCode: string = 'f187d536-7d0c-424a-9811-0a134ea8ae60';

  constructor(private _http: HttpClient) {}

  getSection(hashCode: string) {
    return this._http.get<CourseResponseModel>(
      `${this.baseURL}/Course/get-course-by-hashcode?hashCode=${hashCode}`
    );
  }

  getHashCodeQuiz(hashCode: any) {
    return this._http.get<any>(
      `${this.baseURL}/Quiz/get-by-lession?hashCodeLession=${hashCode}`
    );
  }

  getQuizzDetail(hashCodeSection: string) {
    return this._http.get<any>(`
    ${this.baseURL}/Lession/get-list-lession?sectionHashCode=${hashCodeSection}&userHashCode=${this.userHashCode}`);
  }

  updateLession(lession: any) {
    return this._http.put(
      `https://localhost:5001/api/1.0/Lession/update-lession?lessionHashCode=${lession?.hashCode}`,
      {
        sectionHashCode: lession?.sectionHashCode,
        title: lession?.title,
        duration: lession?.duration,
        link: lession?.link,
        priority: lession?.priority,
        status: 2,
      }
    );
  }

  convertHMS(value: any) {
    const sec = parseInt(value, 10);
    let hours: any = Math.floor(sec / 3600);
    let minutes: any = Math.floor((sec - hours * 3600) / 60);
    let seconds: any = sec - hours * 3600 - minutes * 60;
    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  }
}
