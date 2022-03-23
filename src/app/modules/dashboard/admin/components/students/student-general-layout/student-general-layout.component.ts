import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreDisplayedComponent } from 'src/app/stores/dashboard/student/actions';
import { StudentDashboardState } from 'src/app/stores/dashboard/student/state';

@Component({
  selector: 'app-student-general-layout',
  templateUrl: './student-general-layout.component.html',
  styleUrls: ['./student-general-layout.component.scss'],
})
export class StudentGeneralLayoutComponent implements OnInit {
  @Output()
  returnHomeDashboard = new EventEmitter();

  @Select(StudentDashboardState.getDisplayedComponent)
  displayedComponent$!: Observable<string>;

  displayedComponent = '';

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new StoreDisplayedComponent('list'));
    this.displayedComponent$.subscribe({
      next: (result) => {
        this.displayedComponent = result;
      },
    });
  }

  onReturnHomeDashboard() {
    this.returnHomeDashboard.emit();
  }

  onReturnPreviousComponent() {
    if (this.displayedComponent === 'details') {
      this.store.dispatch(new StoreDisplayedComponent('list'));
    }
    if (this.displayedComponent === 'edit') {
      this.store.dispatch(new StoreDisplayedComponent('details'));
    }
  }
}
