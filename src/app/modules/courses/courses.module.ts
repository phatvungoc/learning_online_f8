import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../shared/shared-module.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { CoursesComponent } from './courses.component';
import { PurchaseBadgeComponent } from './course-detail/purchase-badge/purchase-badge.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

@NgModule({
  declarations: [
    CoursesComponent,
    PurchaseBadgeComponent,
    CourseListComponent,
    CourseDetailComponent,
  ],
  imports: [CommonModule, CoursesRoutingModule, SharedModule],
})
export class CoursesModule {}
