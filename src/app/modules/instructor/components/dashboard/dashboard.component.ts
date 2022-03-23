import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from 'src/app/services/search/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute, 
    private _api: ApiService,
    private _auth: AuthService,
    private _router: Router
    ) {}

  instructorHashCode: string = '';
  courseCount: number;
  studentCount: number;

  ngOnInit(): void {

    this._activatedRoute.queryParamMap
    .pipe(
      concatMap( resp => {
        this.instructorHashCode = resp.get('id');            
        return this._auth.getUserDetail(this.instructorHashCode); 
      })
    ).pipe(
      concatMap( resp => {
        const instructorFirstName = resp.data.firstName;
        return this._api.searchByInstructorName(instructorFirstName);
      })
    ).subscribe(resp => {
      this.courseCount = resp.data.length;
      this.studentCount = resp.data.reduce((preValue, currValue)=> {
        return preValue + currValue.totalStudent;
      },0);
    });

  }


  moveToCreateCourse() {
    this._router.navigate(
      ['instructor/create-course'], 
      { queryParams: { id: this.instructorHashCode } }
    );
    
  }
  moveToTotalCourses() {
    this._router.navigate(
      ['instructor/total-courses'],
      { queryParams: { id: this.instructorHashCode }}
    )
  }
}
