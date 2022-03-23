import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { mergeMap, Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import {
  StoreDisplayedComponent,
  StoreStudent,
} from 'src/app/stores/dashboard/student/actions';
import { StudentDashboardState } from 'src/app/stores/dashboard/student/state';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.scss'],
})
export class StudentDetailsComponent implements OnInit {
  @Select(StudentDashboardState.getStudentHashCode)
  studentHashCode$!: Observable<string>;
  student!: any;
  errorMessage = '';

  constructor(
    private dashboardService: DashboardService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.studentHashCode$
      .pipe(mergeMap((result) => this.dashboardService.getUserDetails(result)))
      .subscribe({
        next: (result) => {
          this.student = result;
          this.store.dispatch(new StoreStudent(this.student));
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
  }

  onUpdateStudent() {
    this.store.dispatch(new StoreDisplayedComponent('edit'));
  }
}
