import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared-module.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';

import { AdminDashboardComponent } from './admin/components/admin-dashboard/admin-dashboard.component';
import { EventsActivitiesComponent } from './admin/components/events-activities/events-activities.component';
import { RecentCoursesComponent } from './admin/components/recent-courses/recent-courses.component';
import { TopStudentsComponent } from './admin/components/top-students/top-students.component';
import { StudentGeneralLayoutComponent } from './admin/components/students/student-general-layout/student-general-layout.component';
import { StudentListComponent } from './admin/components/students/student-list/student-list.component';
import { StudentDetailsComponent } from './admin/components/students/student-details/student-details.component';
import { StudentEditComponent } from './admin/components/students/student-edit/student-edit.component';
import { StudentDashboardState } from 'src/app/stores/dashboard/student/state';
import { CourseGeneralLayoutComponent } from './admin/components/courses/course-general-layout/course-general-layout.component';
import { InstructorGeneralLayoutComponent } from './admin/components/instructors/instructor-general-layout/instructor-general-layout.component';
import { ApproveCoursesGeneralLayoutComponent } from './admin/components/approve-courses/approve-courses-general-layout/approve-courses-general-layout.component';
import { CourseDashboardState } from 'src/app/stores/dashboard/course/state';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    EventsActivitiesComponent,
    RecentCoursesComponent,
    TopStudentsComponent,
    StudentGeneralLayoutComponent,
    StudentListComponent,
    StudentDetailsComponent,
    StudentEditComponent,
    CourseGeneralLayoutComponent,
    InstructorGeneralLayoutComponent,
    ApproveCoursesGeneralLayoutComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    NgxsModule.forFeature([StudentDashboardState, CourseDashboardState]),
  ],
})
export class DashboardModule {}
