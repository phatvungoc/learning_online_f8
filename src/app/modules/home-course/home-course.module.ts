import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeCourseRoutingModule } from './home-course-routing.module';
import { SharedModule } from 'src/app/shared/shared-module.module';
import { HomeCourseComponent } from './home-course.component';

@NgModule({
  declarations: [HomeCourseComponent],
  imports: [CommonModule, HomeCourseRoutingModule, SharedModule],
  exports: [HomeCourseComponent],
})
export class HomeCourseModule {}
