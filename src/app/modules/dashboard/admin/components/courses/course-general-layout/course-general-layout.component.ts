import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreDisplayedComponent } from 'src/app/stores/dashboard/course/actions';
import { CourseDashboardState } from 'src/app/stores/dashboard/course/state';

@Component({
  selector: 'app-course-general-layout',
  templateUrl: './course-general-layout.component.html',
  styleUrls: ['./course-general-layout.component.scss'],
})
export class CourseGeneralLayoutComponent implements OnInit {
  @Output()
  returnHomeDashboard = new EventEmitter();

  @Select(CourseDashboardState.getDisplayedComponent)
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
    this.store.dispatch(new StoreDisplayedComponent('list'));
  }
}
