import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import {
  StoreDisplayedComponent,
  StoreStudentHashCode,
} from 'src/app/stores/dashboard/student/actions';
import { IUser } from '../../../models';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  searchForm!: FormGroup;
  studentList!: Array<IUser>;
  displayList!: Array<IUser>;
  totalStudents!: number;
  currentPage = 1;
  pageSize = 10;

  constructor(
    private dashboardService: DashboardService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      name: new FormControl(''),
      status: new FormControl(0),
    });
    this.onGetStudentList();
  }

  onGetStudentList() {
    this.dashboardService
      .getUserList()
      .pipe(map((data) => data.filter((user: IUser) => user.role === 0)))
      .subscribe({
        next: (data) => {
          this.currentPage = 1;
          this.studentList = data;
          this.displayList = this.studentList.slice();
          this.totalStudents = this.displayList.length;
        },
        error: (err) => console.log(err),
      });
  }

  onSearch() {
    let { name, status } = this.searchForm.value;
    name = name.trim().toLowerCase();
    while (name.includes('  ')) {
      name = name.replaceAll('  ', ' ');
    }
    status = status * 1;
    this.currentPage = 1;
    this.displayList = this.studentList.filter((student) => {
      const fullName = `${student.lastName} ${student.firstName}`;
      return (
        fullName.toLocaleLowerCase().includes(name) && student.status === status
      );
    });
    this.totalStudents = this.displayList.length;
  }

  onGetStudentHashCode(studentHashCode: string) {
    this.store.dispatch(new StoreStudentHashCode(studentHashCode));
    this.store.dispatch(new StoreDisplayedComponent('details'));
  }
}
