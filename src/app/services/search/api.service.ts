import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryResults, SearchResults } from 'src/app/modules/search/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private _http: HttpClient) {}
  OUTSTANDING_COURSES_API =
    'https://localhost:5001/api/1.0/Course/get-outstanding-course';
  CATEGORY_API = 'https://localhost:5001/api/1.0/Category/get-list-category';
  SEARCH_COURSES_API = 'https://localhost:5001/api/1.0/Course/search-course?';
  search(name: string, level: string, price: string) {
    return this._http.get<SearchResults>(
      this.SEARCH_COURSES_API +
        `nameCourse=${name}&levelCourse=${level}&priceCourse=${price}&page=1`
    );
  }

  searchByInstructorName(instructorName: string) {
    return this._http.get<SearchResults>(
      this.SEARCH_COURSES_API + instructorName
    );
  }

  getCategory() {
    return this._http.get<CategoryResults>(this.CATEGORY_API);
  }

  getOutstandingCourses() {
    return this._http.get<SearchResults>(this.OUTSTANDING_COURSES_API);
  }

  paginate(curPage: number, sizeArr: number) {
    let selectArr = [];
    if (sizeArr <= 1) {
      selectArr.push(1);
      return selectArr;
    }
    if (curPage === sizeArr) {
      selectArr.push(1);
      selectArr.push(curPage - 2);
      selectArr.push(curPage - 1);
      selectArr.push(curPage);
      return selectArr;
    }
    if (sizeArr < 6) {
      let i = 1;
      while (i <= sizeArr) {
        selectArr.push(i);
        i++;
      }
      return selectArr;
    } else {
      if (curPage - 3 <= 0) {
        selectArr.push(1);
        selectArr.push(2);
        selectArr.push(curPage);
        if (sizeArr - curPage < 3) {
          selectArr.push(curPage + 1);
          selectArr.push(curPage + 2);
          selectArr.push(sizeArr);
        } else {
          selectArr.push(curPage + 1);
          selectArr.push(curPage + 2);
          selectArr.push(sizeArr);
        }
      } else {
        selectArr.push(1);
        selectArr.push(curPage - 2);
        selectArr.push(curPage - 1);
        selectArr.push(curPage);
        if (sizeArr - curPage < 3) {
          selectArr.push(curPage + 1);
          selectArr.push(sizeArr);
        } else {
          selectArr.push(curPage + 1);
          selectArr.push(curPage + 2);
          selectArr.push(sizeArr);
        }
      }

      selectArr = [...new Set(selectArr)];
      return selectArr;
    }
  }
}
