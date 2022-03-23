import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { StoreDisplayedComponent } from 'src/app/stores/dashboard/student/actions';
import { StudentDashboardState } from 'src/app/stores/dashboard/student/state';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss'],
})
export class StudentEditComponent implements OnInit {
  @Select(StudentDashboardState.getStudent)
  student$!: Observable<any>;
  student!: any;
  updateForm!: FormGroup;

  constructor(
    private dashboardService: DashboardService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.student$.subscribe({
      next: (result) => {
        this.student = result;
        this.updateForm = new FormGroup({
          firstName: new FormControl(this.student.firstName, {
            validators: [
              Validators.required,
              Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
            ],
          }),
          lastName: new FormControl(this.student.lastName, {
            validators: [
              Validators.required,
              Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
            ],
          }),
          email: new FormControl(this.student.email, {
            validators: [
              Validators.required,
              Validators.email,
              Validators.pattern(
                '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}'
              ),
            ],
          }),
          role: new FormControl(this.student.role, {
            validators: [Validators.required],
          }),
          status: new FormControl(this.student.status, {
            validators: [Validators.required],
          }),
        });
      },
    });
  }

  get email() {
    return this.updateForm.controls['email'];
  }
  get firstName() {
    return this.updateForm.controls['firstName'];
  }
  get lastName() {
    return this.updateForm.controls['lastName'];
  }
  get role() {
    return this.updateForm.controls['role'];
  }
  get status() {
    return this.updateForm.controls['status'];
  }

  onSubmit() {
    if (this.updateForm.invalid) return;
    const studentInfo = {
      firstName: this.firstName.value,
      middleName: '',
      lastName: this.lastName.value,
      email: this.email.value,
      role: this.role.value * 1,
      status: this.status.value * 1,
    };
    this.dashboardService
      .updateUserInline(this.student.hashCode, studentInfo)
      .subscribe({
        next: () => {
          this.store.dispatch(new StoreDisplayedComponent('details'));
        },
        error: (err) => console.log(err.message),
      });
  }
}
